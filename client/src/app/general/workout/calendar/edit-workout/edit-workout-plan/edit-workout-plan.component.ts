import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { WorkoutformGenerate } from 'src/app/shared/classes/workoutform-generate';
import { Base } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/services/base.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-edit-workout-plan',
  templateUrl: './edit-workout-plan.component.html'
})
export class EditWorkoutPlanComponent implements OnInit, OnDestroy {
  dataInfo: string;
  weekForm: FormGroup;
  loading = true;
  base$: Observable<Base[]>;
  eSub: Subscription;
  eeSub: Subscription;

  constructor(private _router: Router,
    private _wfg: WorkoutformGenerate,
    private _workoutService: WorkoutService,
    private _baseService: BaseService) {
    const state = this._router.getCurrentNavigation().extras.state as { data: string };

    if (state === undefined) {
      this._router.navigate(['/workout']);
    }
    this.dataInfo = state.data;
  }

  ngOnInit(): void {
    this.eSub = this._workoutService.getWorkout(this.dataInfo).subscribe(
      workout => {
        const weeks = workout.weeks;
        let i = 0;
        for (const days of weeks) {
          let j = 0;
          for (const exercises of days['days']) {
            let k = 0;
            for (const exercise of exercises['exercises']) {
              if (i === 0 && j === 0 && k === 0) {
                this.weekForm = this._wfg.init(exercise['exercise'], exercise['reps']);
              }
              else if (i > 0 && j === 0 && k === 0) {
                this._wfg.addWeek(this.weekForm, exercise['exercise'], exercise['reps']);
              }
              else if (j > 0 && k === 0) {
                this._wfg.addDay(this.weekForm, i, exercise['exercise'], exercise['reps']);
              }
              else if (k > 0) {
                this._wfg.addExercise(this.weekForm, i, j, exercise['exercise'], exercise['reps']);
              }
              k++;
            }
            j++;
          }
          i++;
        }
        this.base$ = this._baseService.getAll();

        this.loading = false;
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  ngOnDestroy(): void {
    if (this.eSub) {
      this.eSub.unsubscribe();
    } else if (this.eeSub) {
      this.eeSub.unsubscribe();
    }
  }

  addExercise(week: number, day: number): void {
    this._wfg.addExercise(this.weekForm, week, day);
  }

  removeExercise(week: number, day: number): void {
    this._wfg.removeExercise(this.weekForm, week, day);
  }

  checkValidButtonRemove(week: number, day: number): boolean {
    return this._wfg.checkValidButtonRemove(this.weekForm, week, day);
  }

  onSubmitUpdate(): void {
    this.eeSub = this._workoutService.updateWeek(this.dataInfo, this.weekForm.value).subscribe(
      workout => {
        MaterialService.toast(workout.message);
        this._router.navigate(['/workout']);
      },
      error => MaterialService.toast(error.error.message)
    );
  }
}
