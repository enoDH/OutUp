import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService,
              private _router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._auth.isAuthenticated()){
      request = request.clone({
        setHeaders: {
          Authorization: this._auth.getToken()
        }
      });
    }
    return next.handle(request)
                .pipe(catchError((error: HttpErrorResponse) => this.handlerAuthError(error)));
  }


  private handlerAuthError(error: HttpErrorResponse): Observable<any>{
    if (error.status === 401){
      this._router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      });
    }

    return throwError(error);
  }
}
