import { NumberSubmitComponent } from './number-submit.component';
import { of } from 'rxjs';
import { IPhoneNumber, IReferenceNumber, IGenerateStatus } from '../model/generate.model';

describe('NumberSubmitComponent', () => {
    let comp: NumberSubmitComponent,
        mockService;

    beforeEach(() => {
        mockService = jasmine.createSpyObj('PhoneCombinationService', ['generate', 'getStatus']);
        comp = new NumberSubmitComponent(mockService);
    });

    describe('generate', () => {

        it('should call generate with integer phone number', () => {
            const formValues = {phoneNumber: '(301) 555-3452'};
            const phoneNumber: IPhoneNumber = { number: 3015553452 };

            mockService.generate.and.returnValue(of(true));
            comp.submit(formValues);

            expect(mockService.generate).toHaveBeenCalledWith(phoneNumber);
        });

        it('should call get status', () => {
            const refNumber: IReferenceNumber = { number: 'ref3015553452' };

            mockService.getStatus.and.returnValue(of(true));
            comp.referenceNumber = refNumber;
            comp.getStatus();

            expect(mockService.getStatus).toHaveBeenCalled();
        });

        it('should set status missing message', () => {
            const refNumber: IReferenceNumber = { number: 'ref3015553452' };
            const status: IGenerateStatus = {ready: false, missing: true, totalNumbers: 0};

            mockService.getStatus.and.returnValue(of(status));
            comp.referenceNumber = refNumber;
            comp.getStatus();

            expect(comp.errorMessage).toBe('Your submission was not found. Please try again.');
        });

        it('should fire event when status is ready', () => {
            const refNumber: IReferenceNumber = { number: 'ref3015553452' };
            const status: IGenerateStatus = {ready: true, missing: false, totalNumbers: 10000};

            mockService.getStatus.and.returnValue(of(status));
            comp.referenceNumber = refNumber;
            comp.viewNumbers.subscribe(e => {
                expect(e).toEqual(refNumber);
            });
            comp.getStatus();

            expect(comp.errorMessage).toBe(null);
        });
    });
});
