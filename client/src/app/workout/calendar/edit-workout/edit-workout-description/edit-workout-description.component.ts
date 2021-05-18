import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-edit-workout-description',
  templateUrl: './edit-workout-description.component.html'
})
export class EditWorkoutDescriptionComponent implements OnInit, OnDestroy {
  dataInfo: string;
  editForm: FormGroup;
  eSub: Subscription;
  eeSub: Subscription;
  img: File;
  imgPath: string;
  loading: boolean = false;

  constructor(private _router: Router,
    private _workoutService: WorkoutService) {
    const state = this._router.getCurrentNavigation().extras.state as { data: string };

    if (state === undefined) {
      this._router.navigate(['/workout']);
    }
    this.dataInfo = state.data;
  }

  ngOnInit(): void {
    this.eSub = this._workoutService.getWorkout(this.dataInfo)
      .subscribe(
        workout => {
          this.editForm = new FormGroup({
            name: new FormControl(workout.name, [Validators.required]),
            date: new FormControl(workout.date, [Validators.required]),
            description: new FormControl(workout.description, [Validators.required]),
            img: new FormControl('')
          });

          this.imgPath = workout.image;
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

  onFileSelect(event: any): void {
    this.editForm.disabled;
    const file = event.target.files[0];
    this.img = file;
    this.loading = true;

    const reader = new FileReader();

    reader.onprogress = (event) => {
      const progress = document.querySelector('.determinate') as HTMLElement;

      const per = event.total / 100;
      const current = ((event.loaded / per) | 0);

      progress.style.width = `${current}%`;
    };

    reader.onload = () => {
      this.imgPath = this.img.name;
      this.loading = false;
      this.editForm.enabled;
    };

    reader.onerror = () => {
      MaterialService.toast(event.error);
    };

    this.loading = false;
    reader.readAsDataURL(file);
  }

  onSubmitUpdate(): void {
    this.editForm.disabled;
    this.eeSub = this._workoutService.updateDescription(
      this.dataInfo,
      this.editForm.value.name,
      this.editForm.value.date,
      this.editForm.value.description,
      this.imgPath,
      this.img).subscribe(
        workout => {
          this.editForm.enabled;
          MaterialService.toast(workout.message);
          this._router.navigate(['/workout']);
        },
        error => MaterialService.toast(error.error.message)
      );
  }
}
