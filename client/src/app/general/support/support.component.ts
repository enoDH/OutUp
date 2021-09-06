import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from '../../shared/classes/material.service';
import { SupportService } from '../../shared/services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  patreonUrl: string = 'https://www.patreon.com/outup';
  patreonImgPath: string = '/uploads/patreon.png';
  payPalUrl: string = 'https://www.patreon.com/outup';
  payPalImgPath: string = '/uploads/paypal.png';
  form: FormGroup;
  constructor(private _supportService: SupportService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      theme: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.form.disable();
    this._supportService.create(this.form.value.theme, this.form.value.description).subscribe(
      support => {
        MaterialService.toast('Your request has been sent!');
        this.form.enable();
        this.form.reset();
      },
      error => MaterialService.toast(error.error.message)
    );
  }
}
