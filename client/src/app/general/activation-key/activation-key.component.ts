import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialService } from '../../shared/classes/material.service';
import { WorkoutService } from '../../shared/services/workout.service';

@Component({
  selector: 'app-activation-key',
  templateUrl: './activation-key.component.html'
})
export class ActivationKeyComponent implements OnInit, OnDestroy {
  key: FormControl;
  aSub: Subscription;

  constructor(private _workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.key = new FormControl('', [Validators.required]);
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  activate(key: string): void {
    this.aSub = this._workoutService.activation(key).subscribe(
      workout => {
        this.key.reset();
        MaterialService.toast(workout.message);
      },
      error => {
        MaterialService.toast(error.error.message);
      }
    );
  }

}
