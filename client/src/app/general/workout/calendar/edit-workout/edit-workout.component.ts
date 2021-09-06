import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html'
})
export class EditWorkoutComponent implements OnInit {
  @ViewChild('description') descriptionRef: ElementRef;
  @ViewChild('plan') planRef: ElementRef;
  isClick: boolean = false;
  id: string;

  constructor(private _router: Router,
    private _renderer: Renderer2) {
    const state = this._router.getCurrentNavigation().extras.state as { data: string };

    if (state == undefined) {
      this._router.navigate(['/workout']);
    }
    this.id = state.data;
  }

  ngOnInit(): void {
  }

  changer(val: number): void {
    this.isClick = true;

    if (val == 0) {
      this._renderer.addClass(this.descriptionRef.nativeElement, 'active');
      this._renderer.setAttribute(this.planRef.nativeElement, 'class', 'col s12 btn_editworkout');
      return;
    }

    this._renderer.setAttribute(this.descriptionRef.nativeElement, 'class', 'col s12 btn_editworkout');
    this._renderer.addClass(this.planRef.nativeElement, 'active');
  }
}
