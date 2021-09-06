import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit, OnDestroy {
  form: FormGroup;
  stateData: Object;
  eSub: Subscription;
  eeSub: Subscription;
  data = [];

  constructor(private _router: Router,
    private _baseService: BaseService,
    private _workoutService: WorkoutService) {
    const state = this._router.getCurrentNavigation().extras.state as {
      workoutId: string,
      dayId: string,
      exerciseId: string,
    };

    if (state === undefined) {
      this._router.navigate(['/workout']);
    }
    this.stateData = state;
  }

  ngOnInit(): void {
    this.eSub = this._workoutService.getWorkout(this.stateData['workoutId']).subscribe(
      workout => {
        for (let days of workout.weeks) {
          for (let exercises of days['days']) {
            if (exercises['_id'] == this.stateData['dayId']) {
              for (let exercise of exercises['exercises']) {
                if (exercise['_id'] == this.stateData['exerciseId']) {
                  this._baseService.getExercise(exercise['exercise']).subscribe(
                    base => {
                      this.data.push(
                        {
                          video: base['video'],
                          exerciseId: exercise['_id'],
                          workoutId: workout['_id'],
                          reps: exercise['reps']
                        }
                      );
                    },
                    error => MaterialService.toast(error.error.message)
                  );
                }
              }
            }
          }
        }
      },
      error => MaterialService.toast(error.error.message)
    );

    this.form = new FormGroup({
      reps: new FormArray([
        new FormControl('', [Validators.requiredTrue]),
        new FormControl('', [Validators.requiredTrue]),
        new FormControl('', [Validators.requiredTrue]),
        new FormControl('', [Validators.requiredTrue]),
        new FormControl('', [Validators.requiredTrue]),
        new FormControl('', [Validators.requiredTrue])
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.eSub) {
      this.eSub.unsubscribe();
    }
    else if (this.eeSub) {
      this.eeSub.unsubscribe();
    }
  }

  back(): void {
    this._router.navigate(["/exercises"], {
      state: { workoutId: this.stateData['workoutId'], dayId: this.stateData['dayId'] }
    });
  }

  done(): void {
    this.eeSub = this._workoutService.updateStatus(this.stateData['workoutId'],
      this.stateData['exerciseId'], true).subscribe(
        update => {
          MaterialService.toast(update.message);
          this._router.navigate(["/exercises"], {
            state: {
              workoutId: this.stateData['workoutId'],
              dayId: this.stateData['dayId']
            }
          });
        },
        error => MaterialService.toast(error.error.message)
      );
  }

}
