import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-base-edit',
  templateUrl: './base-edit.component.html'
})
export class BaseEditComponent implements OnInit, OnDestroy {
  bSub: Subscription;
  bbSub: Subscription;
  form: FormGroup;
  videoPreview: string | ArrayBuffer;
  videoLoading: boolean = false;
  videoPath: string;
  video: File;

  constructor(private _baseService: BaseService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.bSub = this._baseService.getExercise(this._route.snapshot.params.id).subscribe(
      base => {
        this.form = new FormGroup({
          name: new FormControl(base.name, Validators.required),
          video: new FormControl('')
        });
        this.videoPreview = base.video;
        this.videoPath = base.video;
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }

    if (this.bbSub) {
      this.bbSub.unsubscribe();
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.videoLoading = true;
    this.video = file;

    const reader = new FileReader();

    reader.onprogress = (event) => {
      let percent = document.querySelector('.percent');
      let progress = document.querySelector('.progress') as HTMLElement;

      let per = event.total / 100;
      progress.style.width = ((event.loaded / per) | 0) + '%';
      percent.textContent = ((event.loaded / per) | 0) + '%';

      if (((event.loaded / per) | 0) == 100) {
        percent.classList.add("add");
      }
    };

    reader.onload = () => {
      this.videoPath = this.video.name;
      this.videoPreview = reader.result;
      this.videoLoading = false;
    };

    reader.onerror = () => {
      MaterialService.toast(event.error);
    }

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.bbSub = this._baseService.updateExercise(this._route.snapshot.params.id, this.form.value.name,
      String(this.videoPreview), this.video).subscribe(
        base => {
          MaterialService.toast(base.message);
          this._router.navigate(['/base']);
        },
        error => MaterialService.toast(error.error.message)
      );
  }

}
