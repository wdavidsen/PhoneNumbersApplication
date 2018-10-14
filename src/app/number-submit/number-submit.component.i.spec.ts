import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NumberSubmitComponent } from './number-submit.component';
import { PhoneCombinationService } from '../services/phone-combinations.service';
import { IReferenceNumber } from '../model/generate.model';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Validators, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('NumberSubmitComponent', () => {
    let fixture: ComponentFixture<NumberSubmitComponent>,
        comp: NumberSubmitComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {
        const refNum: IReferenceNumber = { number: 'ref3015553454'};
        const mockService = { generate: function() {
            return of(refNum);
        }};

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            declarations: [
                NumberSubmitComponent
            ],
            providers: [
                {provide: PhoneCombinationService, useValue: mockService }
            ],
            schemas: []
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(NumberSubmitComponent);
            comp = fixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;
        });
    }));

    it ('should display status properly', () => {
        comp.ngOnInit();
        fixture.detectChanges();

        comp.submit({phoneNumber: '(301) 555 3454'});
        fixture.detectChanges();

        expect(comp.referenceNumber).toBeTruthy();
        expect(comp.errorMessage).toBeFalsy();
        expect(comp.generateStatus).toBeFalsy();
        expect(element.querySelector('.messages').textContent).toBeTruthy();
        expect(element.querySelector('[submitted-status] h4').textContent).toContain('Submission has been accepted!');
        expect(element.querySelector('[submitted-status] p b').textContent).toBeTruthy();

        // another way to do same thing as above
        expect(debugEl.query(By.css('[submitted-status] h4')).nativeElement.textContent).toContain('Submission has been accepted!');
    });
});
