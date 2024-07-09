import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestProgramNodeComponent} from "./test-program-node.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('TestProgramNodeComponent', () => {
  let fixture: ComponentFixture<TestProgramNodeComponent>;
  let component: TestProgramNodeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestProgramNodeComponent],
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

    fixture = TestBed.createComponent(TestProgramNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
