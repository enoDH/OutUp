import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private _http: HttpClient) { }

  getAllWorkouts(): Observable<Workout[]>{
    return this._http.get<Workout[]>('/api/training');
  }

  getWorkout(id: string): Observable<Workout>{
    return this._http.get<Workout>(`/api/training/${id}`);
  }

  updateStatus(id :string, exerciseId: string, status: boolean): Observable<Workout>{
    const data = {
      _id: id,
      exerciseId: exerciseId,
      status: !status
    };
    return this._http.patch<Workout>('/api/training', data);
  }
}
