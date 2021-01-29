import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { Base } from '../shared/interfaces';
import { BaseService } from '../shared/services/base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html'
})
export class BaseComponent implements OnInit {
  form: FormGroup;
  video: File;
  videoPreview: string | ArrayBuffer;
  base$: Observable<Base[]>;

  constructor(private _baseService: BaseService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      video: new FormControl('', Validators.required)
    });
    this.base$ = this._baseService.getAll();
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.video = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.videoPreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void{
    this.form.disable();
    this._baseService.create(this.form.value.name, this.video).subscribe(
      base => {
        MaterialService.toast('Exercise added!');
        this.videoPreview = "";
        this.form.enable();
      }, 
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      },
      () => {
        this.base$ = this._baseService.getAll();
        this.form.reset();
      }
    );
  }

  deleteExercise(id: string): void {
    this._baseService.delete(id).subscribe(
      response => MaterialService.toast(response.message),
      error => MaterialService.toast(error.error.message),
      () => this.base$ = this._baseService.getAll()
    );
  }
}