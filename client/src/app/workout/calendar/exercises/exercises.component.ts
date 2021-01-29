import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html'
})
export class ExercisesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modalReps') modalRef: ElementRef;
  dayId: string;
  eSub: Subscription;
  eeSub: Subscription;
  eeeSub: Subscription;
  modal: MaterialInstance;
  form: FormGroup;
  exercises = [];
  data$: Observable<any>;

  constructor(private _workoutService: WorkoutService,
    private _baseService: BaseService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dayId = this._route.snapshot.params.id;
    this.eSub = this._workoutService.getAllWorkouts().subscribe(
      workouts => {
        for (const workout of workouts) {
          for (const days of workout['weeks']) {
            for (const exercises of days['days']) {
              if (exercises['_id'] == this.dayId) {
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

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    if (this.eSub) {
      this.eSub.unsubscribe();
    } else if (this.eeSub) {
      this.eeSub.unsubscribe();
    }
    else if (this.eeeSub) {
      this.eeeSub.unsubscribe();
    }

    this.modal.destroy();
  }

  open(exerciseId: string, workoutId: string): void {
    this.eeSub = this._workoutService.getWorkout(workoutId).subscribe(
      workout => {
        let weeks = workout.weeks;
        for (let days of weeks) {
          for (let exercises of days['days']) {
            if (exercises['_id'] == this.dayId) {
              for (let exercise of exercises['exercises']) {
                if (exercise['_id'] == exerciseId) {
                  return this._baseService.getExercise(exercise['exercise']).subscribe(
                    base => {
                      this.data$ = of(
                        {
                          video: base['video'],
                          status: exercise['status'],
                          exerciseId: exercise['_id'],
                          workoutId: workout['_id'],
                          reps: exercise['reps']
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
        }
      },
      error => MaterialService.toast(error.error.message)
    );

    this.modal.open();
  }

  close(): void {
    this.modal.close();
  }

  done(workoutId: string, exerciseId: string, status: boolean) {
    this.eeeSub =  this._workoutService.updateStatus(workoutId, exerciseId, status).subscribe(
      update => {
        MaterialService.toast("The exercise is done!");
      },
      error => MaterialService.toast(error.error.message)
    );
    this.modal.close()
    this.form.reset();
  }

}
