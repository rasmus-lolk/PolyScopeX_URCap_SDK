import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { TestProgramNodeComponent } from './components/test-program-node/test-program-node.component';
import { TestApplicationNodeComponent } from './components/test-application-node/test-application-node.component';
import { TestSmartSkillComponent } from './components/test-smart-skill/test-smart-skill.component';
import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
        { prefix: PATH + '/assets/i18n/', suffix: '.json' },
        { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

@NgModule({
    declarations: [
        TestProgramNodeComponent,
        TestApplicationNodeComponent,
        TestSmartSkillComponent
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
        const testprogramnodeComponent = createCustomElement(TestProgramNodeComponent, {injector: this.injector});
        customElements.define('test-test-test-program-node', testprogramnodeComponent);
        const testapplicationnodeComponent = createCustomElement(TestApplicationNodeComponent, {injector: this.injector});
        customElements.define('test-test-test-application-node', testapplicationnodeComponent);
        const testsmartskillComponent = createCustomElement(TestSmartSkillComponent, {injector: this.injector});
        customElements.define('test-test-test-smart-skill', testsmartskillComponent);
    }

    // This function is never called, because we don't want to actually use the workers, just tell webpack about them
    registerWorkersWithWebPack() {
        new Worker(new URL('./components/test-application-node/test-application-node.behavior.worker.ts'
            /* webpackChunkName: "test-application-node.worker" */, import.meta.url), {
            name: 'test-application-node',
            type: 'module'
        });
        new Worker(new URL('./components/test-program-node/test-program-node.behavior.worker.ts'
            /* webpackChunkName: "test-program-node.worker" */, import.meta.url), {
            name: 'test-program-node',
            type: 'module'
        });
        new Worker(new URL('./components/test-smart-skill/test-smart-skill.behavior.worker.ts'
        /* webpackChunkName: "test-smart-skill.worker" */, import.meta.url), {
        name: 'test-smart-skill',
        type: 'module'
      });
    }
}

