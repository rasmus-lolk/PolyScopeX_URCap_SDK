import {CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule} from '@angular/core';
import {RobotArComponent} from './components/robot-ar/robot-ar.component';
import {UIAngularComponentsModule} from '@universal-robots/ui-angular-components';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {HttpBackend, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {PATH} from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {QRCodeModule} from "angularx-qrcode";
import {RobotModelComponent} from "./components/robot-model/robot-model.component";
import {AppRoutingModule} from "./app-routing.module";

export const httpLoaderFactory = (http: HttpBackend) =>
  new MultiTranslateHttpLoader(http, [
    {prefix: PATH + '/assets/i18n/', suffix: '.json'},
    {prefix: './ui/assets/i18n/', suffix: '.json'},
  ]);

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    UIAngularComponentsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend]},
      useDefaultLang: false,
    }),

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const robotarComponent = createCustomElement(RobotArComponent, {injector: this.injector});
    customElements.define('baggi97-robot-ar-robot-ar', robotarComponent);

    const robotModelComponent = createCustomElement(RobotModelComponent, {injector: this.injector});
    customElements.define('ar-robot-model', robotModelComponent);
  }

  // This function is never called, because we don't want to actually use the workers, just tell webpack about them
  registerWorkersWithWebPack() {
    new Worker(new URL('./components/robot-ar/robot-ar.behavior.worker.ts'
      /* webpackChunkName: "robot-ar.worker" */, import.meta.url), {
      name: 'robot-ar',
      type: 'module'
    });
  }
}

