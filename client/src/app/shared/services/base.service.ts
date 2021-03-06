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

  updateExercise(id: string, name: string, video: string, file?: File): Observable<Message> {
    const fd = new FormData();

    if (file) {
      fd.append('video', file, file.name);
      fd.append('name', name);

      return this._http.patch<Message>(`/api/base/${id}`, fd);
    }

    fd.append('name', name);
    fd.append('video', video);

    return this._http.patch<Message>(`/api/base/${id}`, fd);
  }
}
