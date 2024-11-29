import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotModelComponent } from './robot-model.component';

describe('RobotModelComponent', () => {
  let component: RobotModelComponent;
  let fixture: ComponentFixture<RobotModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
