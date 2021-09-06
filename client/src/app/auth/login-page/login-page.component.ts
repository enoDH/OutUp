import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../../shared/classes/material.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;
  constructor(private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    this._route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('You can now log in using your data!');
      } else if (params['accessDenied']) {
        MaterialService.toast('You need to log in!');
      } else if (params['sessionFailed']) {
        MaterialService.toast('Please log in again!');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(): void {
    this.form.disable();
    this.aSub = this._auth.login(this.form.value).subscribe(
      () => {
        this._auth.getConfirm().subscribe(
          data => {
            if (data.status) {
              this._router.navigate(['/workout']);
            }
            else {
              this._router.navigate(['/confirm-email']);
            }
          },
          error => {
            console.log(error.error.message);
          }
        );
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

}
