import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MaterialDatepicker, MaterialService } from '../shared/classes/material.service';
import { Base } from '../shared/interfaces';
import { BaseService } from '../shared/services/base.service';
import { CreateWorkoutService } from '../shared/services/create-workout.service';

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
  base$: Observable<Base[]>
  cSub: Subscription;

  constructor(private _baseService: BaseService,
    private _formBuilder: FormBuilder,
    private _createWorkoutService: CreateWorkoutService,
    private _router: Router) { }

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

    this.weekForm = this._formBuilder.group({
      weeks: this._formBuilder.array([this.week()])
    });

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
      return
    }

    this.isValid = this.start.date > (new Date());
    if (this.isValid === false) {
      MaterialService.toast('Choose the correct date!');
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.img = file;
  }

  week(): FormGroup {
    return this._formBuilder.group({
      days: this._formBuilder.array([this.day()])
    })
  }

  day(): FormGroup {
    return this._formBuilder.group({
      exercises: this._formBuilder.array([this.exercise()])
    })
  }

  exercise(): FormGroup {
    return this._formBuilder.group({
      exercise: this._formBuilder.control('', [Validators.required]),
      reps: this._formBuilder.array([
        ['', [Validators.min(0), Validators.required]],
        ['', [Validators.min(0), Validators.required]],
        ['', [Validators.min(0), Validators.required]],
        ['', [Validators.min(0), Validators.required]],
        ['', [Validators.min(0), Validators.required]],
        ['', [Validators.min(0), Validators.required]]])
    })
  }

  addWeek(): void {
    (this.weekForm.controls.weeks as FormArray).push(this.week());
  }

  addDay(week: number): void {
    (this.weekForm.get(`weeks.${week}.days`) as FormArray).push(this.day());
  }

  addExercise(week: number, day: number): void {
    (this.weekForm.get(`weeks.${week}.days.${day}.exercises`) as FormArray).push(this.exercise());
  }

  formCreate(week: number, day: number): void {
    for (let i = 0; i < week; i++) {
      if (i > 0) {
        this.addWeek();
      }
      for (let j = 0; j < day - 1; j++) {
        this.addDay(i);
      }
    }
  }

  onSubmitInit(): void {
    let week: number = this.initForm.value.countWeek;
    let day: number = this.initForm.value.countDay;

    this.initForm.disable();

    this.formCreate(week, day);
    this.weekForm.enable();
  }

  onSubmitWeek(): void {
    this.cSub = this._createWorkoutService.create(
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
