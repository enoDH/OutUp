import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('floating_btn') floatingRef: ElementRef;
  id: string;
  workout: object;
  cSub: Subscription;
  ccSub: Subscription;

  constructor(private _workoutService: WorkoutService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params.id;
    this.cSub = this._workoutService.getWorkout(this.id).subscribe(
      workout => {
        this.workout = workout;
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }

    if (this.ccSub) {
      this.ccSub.unsubscribe();
    }
  }

  delete(): void {
    this.ccSub = this._workoutService.deleteWorkout(this.id).subscribe(
      workout => {
        MaterialService.toast(workout.message);
        this._router.navigate(['/workout']);
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  async copyKey(): Promise<void> {
    if (this.workout) {
      await navigator.clipboard.writeText(this.workout['key']).then(
        () => {
          MaterialService.toast(`The key has been copied!`);
        },
        error => MaterialService.toast(`Unable to write to clipboard: ${error.error.message}`));
    }
  }
}
