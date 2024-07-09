import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { SampleProgramNodeComponent } from './components/sample-program-node/sample-program-node.component';
import { SampleApplicationNodeComponent } from './components/sample-application-node/sample-application-node.component';
import { SampleSmartSkillComponent } from './components/sample-smart-skill/sample-smart-skill.component';
import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SampleOperatorScreenComponent } from './components/sample-operator-screen/sample-operator-screen.component';
import { SampleOperatorScreenConfigurationComponent } from './components/sample-operator-screen/sample-operator-screen-configuration.component';
import { SampleSystemInfoNodeComponent } from './components/sample-system-info/sample-system-info-node.component';

export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
        { prefix: PATH + '/assets/i18n/', suffix: '.json' },
        { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

@NgModule({
    declarations: [
        SampleProgramNodeComponent,
        SampleApplicationNodeComponent,
        SampleSmartSkillComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UIAngularComponentsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend] },
            useDefaultLang: false,
        })
    ],
    providers: [],
})

export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const sampleprogramnodeComponent = createCustomElement(SampleProgramNodeComponent, {injector: this.injector});
        customElements.define('universal-robots-contribution-samples-sample-program-node', sampleprogramnodeComponent);
        const sampleapplicationnodeComponent = createCustomElement(SampleApplicationNodeComponent, {injector: this.injector});
        customElements.define('universal-robots-contribution-samples-sample-application-node', sampleapplicationnodeComponent);
        const sampleOperatorScreenComponent = createCustomElement(SampleOperatorScreenComponent, { injector: this.injector });
        customElements.define('universal-robots-contribution-samples-sample-operator-screen', sampleOperatorScreenComponent);
        const sampleOperatorScreenConfigurationComponent = createCustomElement(SampleOperatorScreenConfigurationComponent, { injector: this.injector });
        customElements.define('universal-robots-contribution-samples-sample-operator-screen-configuration', sampleOperatorScreenConfigurationComponent);
        const samplesmartskillComponent = createCustomElement(SampleSmartSkillComponent, {injector: this.injector});
        customElements.define('universal-robots-contribution-samples-sample-smart-skill', samplesmartskillComponent);
        const sampleSystemInfoNodeComponent = createCustomElement(SampleSystemInfoNodeComponent, { injector: this.injector });
        customElements.define('universal-robots-contribution-samples-sample-system-info-node', sampleSystemInfoNodeComponent);
    }

    // This function is never called, because we don't want to actually use the workers, just tell webpack about them
    registerWorkersWithWebPack() {
        new Worker(new URL('./components/sample-application-node/sample-application-node.behavior.worker.ts'
            /* webpackChunkName: "sample-application-node.worker" */, import.meta.url), {
            name: 'sample-application-node',
            type: 'module'
        });
        new Worker(new URL('./components/sample-program-node/sample-program-node.behavior.worker.ts'
            /* webpackChunkName: "sample-program-node.worker" */, import.meta.url), {
            name: 'sample-program-node',
            type: 'module'
        });
        new Worker(new URL('./components/sample-operator-screen/sample-operator-screen.behavior.worker.ts'
            /* webpackChunkName: "sample-operator-screen.worker" */, import.meta.url), {
            name: 'sample-operator-screen.worker',
            type: 'module',
        });
        new Worker(new URL('./components/sample-smart-skill/sample-smart-skill.behavior.worker.ts'
            /* webpackChunkName: "sample-smart-skill.worker" */, import.meta.url), {
            name: 'sample-smart-skill',
            type: 'module'
        });
    }
}

