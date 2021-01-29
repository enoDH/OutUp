import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { Workout } from '../shared/interfaces';
import { WorkoutService } from '../shared/services/workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
})
export class WorkoutComponent implements OnInit, AfterViewInit {
  @ViewChild('floating_btn') floatingRef: ElementRef;
  workouts$: Observable<Workout[]>;
  
  constructor(private _workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.workouts$ = this._workoutService.getAllWorkouts();
  }

  ngAfterViewInit(): void{
    MaterialService.initializeFloatingButton(this.floatingRef);
  }
}
