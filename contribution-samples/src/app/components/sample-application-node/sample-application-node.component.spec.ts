import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SampleApplicationNodeComponent} from "./sample-application-node.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('SampleApplicationNodeComponent', () => {
  let fixture: ComponentFixture<SampleApplicationNodeComponent>;
  let component: SampleApplicationNodeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleApplicationNodeComponent],
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

    fixture = TestBed.createComponent(SampleApplicationNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
