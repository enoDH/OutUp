import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Support } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private _http: HttpClient) { }

  create(theme: string, description: string): Observable<Support>{
    let data = { theme, description};
    return this._http.post<Support>('/api/support', data);
  }
}
