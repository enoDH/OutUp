import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private _http: HttpClient) { }

  verify(code: string): Observable<Message> {
    return this._http.delete<Message>(`/api/verify/email/${code}`);
  }

  resetPassword(code: string): Observable<any> {
    return this._http.delete<any>(`/api/verify/code/${code}`);
  }
}
