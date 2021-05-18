import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Message, Workout } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private _http: HttpClient) { }

  create(name: string, description: string, date, countWeek, countDay, img: File, weeks): Observable<Workout> {
    const fd = new FormData();
    const subText = JSON.stringify(weeks);
    const text = subText.substring(9, subText.length - 1);

    if (img) {
      fd.append('image', img, img.name);
    }
    fd.append('name', name);
    fd.append('description', description);
    fd.append('date', date);
    fd.append('countWeek', countWeek);
    fd.append('countDay', countDay);
    fd.append('weeks', text);

    return this._http.post<Workout>('/api/training', fd);
  }

  getAllWorkouts(): Observable<Workout[]> {
    return this._http.get<Workout[]>('/api/training');
  }

  getWorkout(id: string): Observable<Workout> {
    return this._http.get<Workout>(`/api/training/${id}`);
  }

  updateStatus(id: string, exerciseId: string, status: boolean): Observable<Message> {
    const data = {
      _id: id,
      exerciseId,
      status: !status
    };
    return this._http.patch<Message>('/api/training', data);
  }

  updateWeek(id: string, week: any): Observable<Message> {
    const subText = JSON.stringify(week);
    const text = subText.substring(9, subText.length - 1);

    return this._http.patch<Message>('/api/training/plan', { id, weeks: text });
  }

  updateDescription(id: string, name: string, date, description: string, imgPath: string, img?: File): Observable<Message> {
    const fd = new FormData();

    if (img) {
      fd.append('image', img, img.name);
      fd.append('_id', id);
      fd.append('name', name);
      fd.append('description', description);
      fd.append('date', date);

      return this._http.patch<Message>('/api/training/description', fd);
    }
    fd.append('image', imgPath);
    fd.append('_id', id);
    fd.append('name', name);
    fd.append('description', description);
    fd.append('date', date);

    return this._http.patch<Message>('/api/training/description', fd);
  }

  activation(key: string): Observable<Message> {
    return this._http.patch<Message>('/api/training/activation', { key });
  }

  deleteWorkout(id: string): Observable<Message> {
    return this._http.delete<Message>(`/api/training/${id}`);
  }
}
