import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramPresenter, ProgramPresenterAPI, RobotSettings, InsertionEnum, ProgramTreeService, TreeContext, SubtreeNode } from '@universal-robots/contribution-api';
import { TestProgramNodeNode } from './test-program-node.node';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './test-program-node.component.html',
    styleUrls: ['./test-program-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TestProgramNodeComponent implements OnChanges, ProgramPresenter {
    // presenterAPI is optional
    @Input() presenterAPI: ProgramPresenterAPI;

    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // contributedNode is optional
    @Input() contributedNode: TestProgramNodeNode;

    @Input() programTree: TreeContext;

    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
    }

    // call saveNode to save node parameters
    async saveNode() {
        this.cd.detectChanges();
        await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
    }

    async updateButton() {

        //Looping through all decendents of the node to find comment and update it
        for await (const child of this.programTree.depthFirst) {
            if (child?.node?.type === 'ur-comment' && child?.node?.parameters) {
                child.node.parameters.comment = 'test';
                this.presenterAPI.programTreeService.updateChildNode(child);
            }
        }
    
    }

    async addButton() {
        const myself = this.presenterAPI.selectedNodeId;
        // Create a Folder node
        const folderNode = await this.presenterAPI.builder.createNode('ur-folder');
        // Convert node to BranchNode which enables adding children
        const folderBranchNode = await this.presenterAPI.builder.createBranchNode(folderNode);

        // Create Comment node
        const commentNode = await this.presenterAPI.builder.createNode('ur-comment');
        // Add Comment node to Folder node
        folderBranchNode.children.push(commentNode);

        // Create Folder node
        const anotherFolderNode = await this.presenterAPI.builder.createNode('ur-folder');
        // Convert node to BrachNode which enables adding children
        const anotherFolderBranchNode = await this.presenterAPI.builder.createBranchNode(anotherFolderNode);

        // Create Comment node
        const anotherCommentNode = await this.presenterAPI.builder.createNode('ur-comment');

        // Add comment node to second Folder node
        anotherFolderBranchNode.children.push(anotherCommentNode);

        // Add second Folder node to the first Folder node
        folderBranchNode.children.push(anotherFolderBranchNode);

        // Add the folder node as child into this node
        await this.presenterAPI.programTreeService.addNode({
            insertionRelativeToPivotNode: InsertionEnum.INTO_LAST,
            pivotNodeId: myself,
            node: folderBranchNode,
        });
    }
}
