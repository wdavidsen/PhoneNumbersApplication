import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneCombinationService } from '../services/phone-combinations.service';
import { IPhoneNumber, IReferenceNumber, IGenerateStatus } from '../model/generate.model';

@Component({
  selector: 'app-number-submit',
  templateUrl: './number-submit.component.html',
  styleUrls: ['./number-submit.component.scss']
})
export class NumberSubmitComponent implements OnInit {
  @Output() viewNumbers = new EventEmitter();
  numberForm: FormGroup;
  referenceNumber: IReferenceNumber;
  generateStatus: IGenerateStatus;
  errorMessage: string = null;

  constructor(private comboService: PhoneCombinationService) {
  }

  ngOnInit() {
    const validators = [
      Validators.required,
      Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    ];
    const phoneNumber = new FormControl('301-555-8923', validators);
    this.numberForm = new FormGroup({
      phoneNumber: phoneNumber
    });
  }

  submit(formValues) {
    const number: IPhoneNumber = {
      number: this.removeNonDidgits(formValues.phoneNumber)
    };

    this.reset();

    this.comboService.generate(number).subscribe((result: IReferenceNumber) => {
      this.referenceNumber = result;
    });
  }

  getStatus() {
    this.comboService.getStatus(this.referenceNumber.number).subscribe((result: IGenerateStatus) => {
      this.generateStatus = result;

      if (result.missing) {
        this.reset();
        this.errorMessage = 'Your submission was not found. Please try again.';
        return;
      }

      if (result.ready) {
        this.viewNumbers.emit(this.referenceNumber);
      }
    });
  }

  validatePhoneNumber() {
    const controls = this.numberForm.controls;
    return controls.phoneNumber.valid || controls.phoneNumber.untouched;
  }

  private removeNonDidgits(number: string) {
    return parseInt(number.replace(/\D/g, ''), 10);
  }

  private reset() {
    this.referenceNumber = null;
    this.generateStatus = null;
    this.errorMessage = null;
    this.viewNumbers.emit(null);
  }
}
