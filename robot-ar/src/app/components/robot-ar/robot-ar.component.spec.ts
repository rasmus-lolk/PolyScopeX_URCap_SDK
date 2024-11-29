import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RobotArComponent} from "./robot-ar.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('RobotArComponent', () => {
  let fixture: ComponentFixture<RobotArComponent>;
  let component: RobotArComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotArComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(RobotArComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
