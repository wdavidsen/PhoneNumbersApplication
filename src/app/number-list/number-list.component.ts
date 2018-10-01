import { Component, Input } from '@angular/core';
import { PhoneCombinationService } from '../services/phone-combinations.service';
import { IGenerateResults, IReferenceNumber } from '../model/generate.model';

@Component({
  selector: 'app-number-list',
  templateUrl: './number-list.component.html',
  styleUrls: ['./number-list.component.scss']
})
export class NumberListComponent {
  @Input() referenceId: IReferenceNumber;
  pageNumber = 1;
  pageSize = 100;
  pageCount = 0;
  results: IGenerateResults;

  constructor(private comboService: PhoneCombinationService) {

  }

  public showFirstPage() {
    this.load(0, this.pageSize);
  }

  public changePage() {
    const start = (this.pageNumber - 1) * this.pageSize;
    this.load(start, this.pageSize);
  }

  private load(start: number, take: number) {
    this.comboService.load(this.referenceId.number, start, take)
      .subscribe((results: IGenerateResults) => {
        this.results = results;
        this.pageCount = Math.ceil(results.totalCount / this.pageSize);
    });
  }
}
