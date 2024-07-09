import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RobotSettings, SystemInfoPresenter, SystemInfoPresenterAPI } from '@universal-robots/contribution-api';

@Component({
    standalone: true,
    imports: [],
    templateUrl: './sample-system-info-node.component.html',
    styleUrls: ['./sample-system-info-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleSystemInfoNodeComponent implements SystemInfoPresenter {
    @Input() presenterAPI: SystemInfoPresenterAPI;
    @Input() robotSettings: RobotSettings;
}
