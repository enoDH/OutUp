import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { VerifyService } from 'src/app/shared/services/verify.service';

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.component.html'
})
export class ResetConfirmComponent implements OnInit, OnDestroy {
  code: FormControl;
  rSub: Subscription;

  constructor(private _verifyService: VerifyService,
    private _router: Router) { }

  ngOnInit(): void {
    this.code = new FormControl('', [Validators.required]);
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  verify(): void {
    this.rSub = this._verifyService.resetPassword(this.code.value).subscribe(
      response => {
        MaterialService.toast('The application is accepted!');
        this._router.navigate(['/reset-password/reset'], { state: { id: response } });
      },
      error => {
        MaterialService.toast(error.error.message);
      }
    );
  }
}
