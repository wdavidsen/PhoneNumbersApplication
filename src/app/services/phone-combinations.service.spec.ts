import { PhoneCombinationService } from './phone-combinations.service';
import { Observable, of } from 'rxjs';
import { IPhoneNumber } from '../model/generate.model';
import { HttpHeaders } from '@angular/common/http';

describe('PhoneCombinationService', () => {
    let service: PhoneCombinationService,
        mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['post', 'get']);
        service = new PhoneCombinationService(mockHttp);
    });

    describe('generate', () => {

        it('should post correct data with the correct url', () => {
            const phoneNumber: IPhoneNumber = {number: 3015553454};
            const url = 'http://localhost:8080/variants/';

            mockHttp.post.and.returnValue(of(true));
            service.generate(phoneNumber);

            expect(mockHttp.post).toHaveBeenCalledWith(url, phoneNumber, jasmine.any(Object));
        });

        it('should get status with the correct url', () => {
            const referenceId = 'ref3015553454';
            const url = 'http://localhost:8080/variants/' + referenceId + '/status';

            mockHttp.get.and.returnValue(of(true));
            service.getStatus(referenceId);

            expect(mockHttp.get).toHaveBeenCalledWith(url, jasmine.any(Object));
        });
    });
});
