import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password-done',
  templateUrl: './reset-password-done.component.html'
})
export class ResetPasswordDoneComponent implements OnInit, OnDestroy {
  password: FormControl;
  stateData: string;
  rSub: Subscription;

  constructor(private _router: Router,
    private _authService: AuthService) {
    const state = this._router.getCurrentNavigation().extras.state as { id: string };

    if (state === undefined) {
      this._router.navigate(['/login']);
    }
    this.stateData = state.id;
  }

  ngOnInit(): void {
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  reset(): void {
    this.rSub = this._authService.resetPassword(this.stateData, this.password.value).subscribe(
      response => {
        MaterialService.toast(response.message);
        this._router.navigate(['/login']);
      },
      error => {
        MaterialService.toast(error.error.message);
      }
    );
  }

}
