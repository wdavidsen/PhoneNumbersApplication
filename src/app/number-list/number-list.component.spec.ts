import { NumberListComponent } from './number-list.component';
import { Observable, of } from 'rxjs';
import { IReferenceNumber, IGenerateResults } from '../model/generate.model';


describe('NumberListComponent', () => {
    let comp: NumberListComponent,
        mockService;

    beforeEach(() => {
        mockService = jasmine.createSpyObj('PhoneCombinationService', ['load']);
        comp = new NumberListComponent(mockService);
    });

    describe('generate', () => {

        it('should show first page', () => {
            const start = 0;
            const pageSize = 10;
            const refNum: IReferenceNumber = {number: 'ref3015558372'};

            mockService.load.and.returnValue(of(true));

            comp.pageSize = pageSize;
            comp.referenceId = refNum;
            comp.showFirstPage();

            expect(mockService.load).toHaveBeenCalledWith(refNum.number, start, pageSize);
        });

        it('should change page', () => {
            const pageNumber = 2;
            const pageSize = 10;
            const refNum: IReferenceNumber = {number: 'ref3015558372'};

            mockService.load.and.returnValue(of(true));

            comp.pageNumber = pageNumber;
            comp.pageSize = pageSize;
            comp.referenceId = refNum;
            comp.changePage();

            const start = (pageNumber - 1) * pageSize;

            expect(mockService.load).toHaveBeenCalledWith(refNum.number, start, comp.pageSize);
        });

        it('should set results', () => {
            const start = 0;
            const pageSize = 10;
            const refNum: IReferenceNumber = {number: 'ref3015558372'};
            const results: IGenerateResults = { totalCount: 11,
                numberVariants: ['0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']};

            mockService.load.and.returnValue(of(results));

            comp.pageSize = pageSize;
            comp.referenceId = refNum;
            comp.showFirstPage();

            expect(comp.results.totalCount).toBeGreaterThan(0);
            expect(comp.results.numberVariants.length).toBeGreaterThan(0);
        });

        it('should set correct page count', () => {
            const pageSize = 10;
            const refNum: IReferenceNumber = {number: 'ref3015558372'};
            const results: IGenerateResults = { totalCount: 11,
                numberVariants: ['0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']};

            mockService.load.and.returnValue(of(results));

            comp.pageSize = pageSize;
            comp.referenceId = refNum;
            comp.showFirstPage();

            expect(comp.pageCount).toBe(2);
        });
    });
});
