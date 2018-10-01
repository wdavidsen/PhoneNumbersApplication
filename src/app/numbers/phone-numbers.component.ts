import { Component } from '@angular/core';
import { IReferenceNumber } from '../model/generate.model';

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.scss']
})
export class PhoneNumbersComponent {
  referenceId: IReferenceNumber;

  constructor() {
  }

  viewNumbers(referenceId: IReferenceNumber) {
    this.referenceId = referenceId;
  }
}
