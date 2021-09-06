import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { MaterialService } from '../../shared/classes/material.service';
import { Workout } from '../../shared/interfaces';
import { WorkoutService } from '../../shared/services/workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
})
export class WorkoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('floating_btn') floatingRef: ElementRef;
  workouts$: Observable<Workout[]>;
  wSub: Subscription;
  base;

  constructor(private _workoutService: WorkoutService,
    private _baseService: BaseService) { }

  ngOnInit(): void {
    this.wSub = this._baseService.getAll().subscribe(
      bases => {
        this.base = bases;
      },
      error => {
        MaterialService.toast(error.error.message);
      }
    );
    this.workouts$ = this._workoutService.getAllWorkouts();
  }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  ngOnDestroy(): void {
    if (this.wSub) {
      this.wSub.unsubscribe();
    }
  }
}
