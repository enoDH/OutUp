import { Injectable } from '@angular/core';
import { Message, User } from '../interfaces';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token = null;
  constructor(private _http: HttpClient) { }

  register(user: User): Observable<User> {
    return this._http.post<User>('/api/auth/register', user);
  }

  login(user: User): Observable<{ token: string }> {
    return this._http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          })
      );
  }

  setToken(token: string): void {
    this._token = token;
  }

  getToken(): string {
    return this._token;
  }

  getUser(): Observable<any> {
    return this._http.get<any>('/api/auth/user');
  }

  isAuthenticated(): boolean {
    return !!this._token;
  }

  loguot(): void {
    this.setToken(null);
    localStorage.clear();
  }

  getConfirm(): Observable<any> {
    return this._http.get<any>('/api/auth/confirm');
  }

  checkEmail(data: string): Observable<any> {
    return this._http.get<any>(`/api/auth/check/${data}`);
  }

  resetPassword(id: string, password: string): Observable<Message> {
    return this._http.patch<Message>(`/api/auth/reset/${id}`, { password });
  }
}
