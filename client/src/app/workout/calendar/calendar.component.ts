import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Workout } from 'src/app/shared/interfaces';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  workout$: Observable<Workout>;
  id: string;

  constructor(private _workoutService: WorkoutService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params.id;
    this.workout$ = this._workoutService.getWorkout(this.id);
  }
}
