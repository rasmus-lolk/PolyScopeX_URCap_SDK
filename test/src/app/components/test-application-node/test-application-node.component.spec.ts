import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestApplicationNodeComponent} from "./test-application-node.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('TestApplicationNodeComponent', () => {
  let fixture: ComponentFixture<TestApplicationNodeComponent>;
  let component: TestApplicationNodeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestApplicationNodeComponent],
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

    fixture = TestBed.createComponent(TestApplicationNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
