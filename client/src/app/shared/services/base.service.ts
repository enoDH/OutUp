import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base, Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Base[]> {
    return this._http.get<Base[]>('/api/base');
  }

  getExercise(id: string): Observable<Base> {
    return this._http.get<Base>(`/api/base/${id}`);
  }

  create(name: string, video: File): Observable<Base> {
    const fd = new FormData();

    if (video) {
      fd.append('video', video, video.name);
    }
    fd.append('name', name);

    return this._http.post<Base>('/api/base', fd);
  }

  delete(id: string): Observable<Message> {
    return this._http.delete<Message>(`/api/base/${id}`);
  }

  updateUse(id: string): Observable<Message> {
    return this._http.patch<Message>(`/api/base/`, { id });
  }
}
