import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CreateWorkoutService {

  constructor(private _http: HttpClient) { }

  create(name: string, description: string, date, countWeek, countDay, img: File, weeks): Observable<Workout> {
    const fd = new FormData();
    let subText = JSON.stringify(weeks);
    let text = subText.substring(9, subText.length - 1);

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
}
