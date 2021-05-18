import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class WorkoutformGenerate {

    constructor(private _formBuilder: FormBuilder) { }

    init(exercise?: string, reps?: Array<any>): FormGroup {
        if (exercise && reps) {
            return this._formBuilder.group({
                weeks: this._formBuilder.array([this.week(exercise, reps)])
            });
        } else {
            return this._formBuilder.group({
                weeks: this._formBuilder.array([this.week()])
            });
        }
    }

    week(exercise?: string, reps?: Array<any>): FormGroup {
        if (exercise && reps) {
            return this._formBuilder.group({
                days: this._formBuilder.array([this.day(exercise, reps)])
            })
        } else {
            return this._formBuilder.group({
                days: this._formBuilder.array([this.day()])
            })
        }
    }

    day(exercise?: string, reps?: Array<any>): FormGroup {
        if (exercise && reps) {
            return this._formBuilder.group({
                exercises: this._formBuilder.array([this.exercise(exercise, reps)])
            });
        } else {
            return this._formBuilder.group({
                exercises: this._formBuilder.array([this.exercise()])
            });
        }
    }

    exercise(exercise?: string, reps?: Array<any>): FormGroup {
        if (exercise && reps) {
            return this._formBuilder.group({
                exercise: this._formBuilder.control(exercise, [Validators.required]),
                reps: this._formBuilder.array([
                    [reps[0], [Validators.min(0), Validators.required]],
                    [reps[1], [Validators.min(0), Validators.required]],
                    [reps[2], [Validators.min(0), Validators.required]],
                    [reps[3], [Validators.min(0), Validators.required]],
                    [reps[4], [Validators.min(0), Validators.required]],
                    [reps[5], [Validators.min(0), Validators.required]]])
            });
        }
        else {
            return this._formBuilder.group({
                exercise: this._formBuilder.control('', [Validators.required]),
                reps: this._formBuilder.array([
                    ['', [Validators.min(0), Validators.required]],
                    ['', [Validators.min(0), Validators.required]],
                    ['', [Validators.min(0), Validators.required]],
                    ['', [Validators.min(0), Validators.required]],
                    ['', [Validators.min(0), Validators.required]],
                    ['', [Validators.min(0), Validators.required]]])
            });
        }
    }

    addWeek(form: FormGroup, exercise?: string, reps?: Array<any>): void {
        if (exercise && reps) {
            (form.controls.weeks as FormArray).push(this.week(exercise, reps));
        } else {
            (form.controls.weeks as FormArray).push(this.week());
        }
    }

    addDay(form: FormGroup, week: number, exercise?: string, reps?: Array<any>): void {
        if (exercise && reps) {
            (form.get(`weeks.${week}.days`) as FormArray).push(this.day(exercise, reps));
        } else {
            (form.get(`weeks.${week}.days`) as FormArray).push(this.day());
        }
    }

    addExercise(form: FormGroup, week: number, day: number, exercise?: string, reps?: Array<any>): void {
        if (exercise && reps) {
            (form.get(`weeks.${week}.days.${day}.exercises`) as FormArray).push(this.exercise(exercise, reps));
        } else {
            (form.get(`weeks.${week}.days.${day}.exercises`) as FormArray).push(this.exercise());
        }
    }

    removeExercise(form: FormGroup, week: number, day: number): void {
        (form.get(`weeks.${week}.days.${day}.exercises`) as FormArray)
            .removeAt((form.get(`weeks.${week}.days.${day}.exercises`) as FormArray).length - 1);
    }

    checkValidButtonRemove(form: FormGroup, week: number, day: number): boolean {
        let status: boolean = false;

        if ((form.get(`weeks.${week}.days.${day}.exercises`) as FormArray).length === 1) {
            status = false;
        } else {
            status = true;
        }

        return status;
    }

    formCreate(form: FormGroup, week: number, day: number): void {
        for (let i = 0; i < week; i++) {
            if (i > 0) {
                this.addWeek(form);
            }
            for (let j = 0; j < day - 1; j++) {
                this.addDay(form, i);
            }
        }
    }
}
