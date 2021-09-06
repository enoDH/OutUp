import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MaterialDatepicker, MaterialService } from '../../shared/classes/material.service';
import { WorkoutformGenerate } from '../../shared/classes/workoutform-generate';
import { Base } from '../../shared/interfaces';
import { BaseService } from '../../shared/services/base.service';
import { WorkoutService } from '../../shared/services/workout.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('start') startRef: ElementRef;
  start: MaterialDatepicker;
  isValid: boolean = true;
  img: File;
  weekForm: FormGroup;
  initForm: FormGroup;
  base$: Observable<Base[]>;
  cSub: Subscription;
  loading: boolean = false;

  constructor(private _baseService: BaseService,
    private _workoutService: WorkoutService,
    private _router: Router,
    private _wfg: WorkoutformGenerate) { }

  ngOnInit(): void {
    this.base$ = this._baseService.getAll();
    this.initForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(''),
      countWeek: new FormControl('', [Validators.min(1), Validators.required]),
      countDay: new FormControl('', [Validators.min(1), Validators.required]),
      img: new FormControl('', [Validators.required])
    });

    this.weekForm = this._wfg.init();

    this.weekForm.disable();
  }

  ngOnDestroy(): void {
    this.start.destroy();

    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
  }

  validate(): void {
    if (!this.start.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date > (new Date());
    if (this.isValid === false) {
      MaterialService.toast('Choose the correct date!');
    }
  }

  onFileSelect(event: any): void {
    this.initForm.disabled;
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
      this.loading = false;
      this.initForm.enabled;
    };

    reader.onerror = () => {
      MaterialService.toast(event.error);
    };

    this.loading = false;
    reader.readAsDataURL(file);
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

  formCreate(week: number, day: number): void {
    this._wfg.formCreate(this.weekForm, week, day);
  }

  onSubmitInit(): void {
    const week: number = this.initForm.value.countWeek;
    const day: number = this.initForm.value.countDay;

    this.initForm.disable();

    this.formCreate(week, day);
    this.weekForm.enable();
  }

  onSubmitWeek(): void {
    this.cSub = this._workoutService.create(
      this.initForm.value.name,
      this.initForm.value.description,
      this.start.date,
      this.initForm.value.countWeek,
      this.initForm.value.countDay,
      this.img,
      this.weekForm.value).subscribe(
        workout => {
          MaterialService.toast('Added new workout!');
          this.initForm.reset();
          this.initForm.enable();
          this.weekForm.disable();
          this.weekForm.reset();
          this._router.navigate(['/workout']);
        },
        error => {
          MaterialService.toast(error.error.message);
        }
      );
  }

}
