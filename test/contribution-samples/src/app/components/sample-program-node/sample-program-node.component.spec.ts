import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SampleProgramNodeComponent} from "./sample-program-node.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('SampleProgramNodeComponent', () => {
  let fixture: ComponentFixture<SampleProgramNodeComponent>;
  let component: SampleProgramNodeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleProgramNodeComponent],
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

    fixture = TestBed.createComponent(SampleProgramNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
