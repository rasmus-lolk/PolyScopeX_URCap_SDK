import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleSystemInfoNodeComponent } from './sample-system-info-node.component';

describe('Sample system info node component', () => {
    let component: SampleSystemInfoNodeComponent;
    let fixture: ComponentFixture<SampleSystemInfoNodeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(SampleSystemInfoNodeComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
