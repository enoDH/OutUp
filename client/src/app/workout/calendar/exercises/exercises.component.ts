import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html'
})
export class ExercisesComponent implements OnInit, OnDestroy {
  stateData: Object;
  eSub: Subscription;
  eeSub: Subscription;
  exercises = [];

  constructor(private _workoutService: WorkoutService,
    private _baseService: BaseService,
    private _router: Router) {
    const state = this._router.getCurrentNavigation().extras.state as { workoutId: string, dayId: string };

    if (state === undefined) {
      this._router.navigate(['/workout']);
    }
    this.stateData = state;
  }

  ngOnInit(): void {
    this.eSub = this._workoutService.getWorkout(this.stateData['workoutId']).subscribe(
      workout => {
        for (const days of workout['weeks']) {
          for (const exercises of days['days']) {
            if (exercises['_id'] == this.stateData['dayId']) {
              for (const exercise of exercises['exercises']) {
                this._baseService.getExercise(exercise['exercise']).subscribe(
                  base => {
                    this.exercises.push(
                      {
                        name: base['name'],
                        exerciseId: exercise['_id'],
                        workoutId: workout['_id'],
                        status: exercise['status']
                      }
                    );
                  },
                  error => {
                    MaterialService.toast(error.error.message);
                  }
                );
              }
            }
          }
        }
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  ngOnDestroy(): void {
    if (this.eSub) {
      this.eSub.unsubscribe();
    }
  }

  open(exerciseId: string, workoutId: string): void {
    this._router.navigate(['/exercise'], {state: { exerciseId, workoutId, dayId: this.stateData['dayId']}});
  }
}
