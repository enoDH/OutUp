import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Workout } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private _http: HttpClient) { }

  getAllWorkouts(): Observable<Workout[]> {
    return this._http.get<Workout[]>('/api/training');
  }

  getWorkout(id: string): Observable<Workout> {
    return this._http.get<Workout>(`/api/training/${id}`);
  }

  updateStatus(id: string, exerciseId: string, status: boolean): Observable<Message> {
    const data = {
      _id: id,
      exerciseId: exerciseId,
      status: !status
    };
    return this._http.patch<Message>('/api/training', data);
  }

  activation(key: string): Observable<Message> {
    return this._http.patch<Message>('/api/training/activation', { key });
  }

  deleteWorkout(id: string): Observable<Message> {
    return this._http.delete<Message>(`/api/training/${id}`);
  }
}
