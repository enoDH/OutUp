import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { Base } from '../shared/interfaces';
import { BaseService } from '../shared/services/base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html'
})
export class BaseComponent implements OnInit, OnDestroy {
  form: FormGroup;
  video: File;
  videoLoading: boolean = false;
  videoPreview: string | ArrayBuffer;
  base$: Observable<Base[]>;
  bSub: Subscription;
  bbSub: Subscription;

  @ViewChild('inputRef') inputRef: ElementRef;

  constructor(private _baseService: BaseService, private _renderer: Renderer2) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      video: new FormControl('', Validators.required)
    });
    this.base$ = this._baseService.getAll();
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    } else if (this.bbSub) {
      this.bbSub.unsubscribe();
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.videoLoading = true;
    this.video = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.videoPreview = reader.result;
      this.videoLoading = false;
    };

    reader.onerror = () => {
      MaterialService.toast(event.error);
    }

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.form.disable();
    this.bSub = this._baseService.create(this.form.value.name, this.video).subscribe(
      base => {
        MaterialService.toast('Exercise added!');
        this.inputRef.nativeElement.text = null;
        this._renderer.setProperty(this.inputRef.nativeElement, 'value', '');
        this.videoPreview = '';
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
    this.bbSub = this._baseService.getExercise(id).subscribe(
      base => {
        if (base.use > 0) {
          MaterialService.toast("You cannot delete this exercise because it is in use!")
        } else {
          this._baseService.delete(id).subscribe(
            response => MaterialService.toast(response.message),
            error => MaterialService.toast(error.error.message),
            () => this.base$ = this._baseService.getAll()
          );
        }
      },
      error => MaterialService.toast(error.error.message)
    );
  }
}
