import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { VerifyService } from 'src/app/shared/services/verify.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  code: FormControl;
  cSub: Subscription;

  constructor(private _verifyService: VerifyService,
    private _router: Router) { }

  ngOnInit(): void {
    this.code = new FormControl('', [Validators.required]);
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  submit(): void {
    this.cSub = this._verifyService.verify(this.code.value).subscribe(
      response => {
        MaterialService.toast(response.message);
        this._router.navigate(['/workout']);
      },
      error => {
        MaterialService.toast(error.error.message);
      }
    );
  }

}
