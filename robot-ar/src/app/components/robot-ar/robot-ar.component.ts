import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
  OnChanges,
  signal,
  SimpleChanges,
  computed
} from '@angular/core';
import {ApplicationPresenterAPI, ApplicationPresenter, RobotSettings} from '@universal-robots/contribution-api';
import {RobotArNode} from './robot-ar.node';
import {QRCodeModule} from "angularx-qrcode";
import {NgIf} from "@angular/common";
import {firstValueFrom} from "rxjs";

@Component({
  templateUrl: './robot-ar.component.html',
  styleUrls: ['./robot-ar.component.scss'],
  imports: [QRCodeModule, NgIf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RobotArComponent implements ApplicationPresenter, OnChanges {
  protected readonly translateService = inject(TranslateService);
  protected readonly cd = inject(ChangeDetectorRef);

  url = signal<string>(`http://${window.location.host}/baggi97/robot-ar/robot-ar`);
  robotType = signal<string | undefined>(undefined);

  robotARURL = computed(() => `${this.url()}?robotType=${this.robotType()}`);

  // applicationAPI is optional
  @Input() applicationAPI: ApplicationPresenterAPI;
  // robotSettings is optional
  @Input() robotSettings: RobotSettings;
  // applicationNode is required
  @Input() applicationNode: RobotArNode;

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
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

      await firstValueFrom(this.translateService.use(changes?.robotSettings?.currentValue?.language));
    }

    if (changes.applicationAPI.isFirstChange() && changes.applicationAPI.currentValue) {
      const robotType = await this.applicationAPI.robotInfoService.getRobotType();
      this.robotType.set(robotType);

    }
  }


  // call saveNode to save node parameters
  saveNode() {
    this.cd.detectChanges();
    this.applicationAPI.applicationNodeService.updateNode(this.applicationNode);
  }
}
