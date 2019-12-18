import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateOffer() {
    console.log(this.form);
  }
}