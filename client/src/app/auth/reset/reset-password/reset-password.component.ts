import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  data: FormControl;
  rSub: Subscription;

  constructor(private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = new FormControl('', [Validators.required]);
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  check(): void {
    this.rSub = this._authService.checkEmail(this.data.value).subscribe(
      result => {
        if (result) {
          MaterialService.toast('A verification code has been sent to you!');
          this._router.navigate(['confirm'], { relativeTo: this._route });
        }
        else {
          MaterialService.toast('Nothing found!');
        }
      },
      error => {
        MaterialService.toast(error.error.message);
      }
    );
  }
}
