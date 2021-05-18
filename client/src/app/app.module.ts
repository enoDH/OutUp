import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { WorkoutComponent } from './workout/workout.component';
import { BaseComponent } from './base/base.component';
import { SupportComponent } from './support/support.component';
import { CalendarComponent } from './workout/calendar/calendar.component';
import { CreateComponent } from './create/create.component';
import { ExercisesComponent } from './workout/calendar/exercises/exercises.component';
import { ExerciseComponent } from './workout/calendar/exercises/exercise/exercise.component';
import { ActivationKeyComponent } from './activation-key/activation-key.component';
import { PreloaderV1Component } from './shared/components/preloader-v1/preloader-v1.component';
import { LoaderV1Component } from './shared/components/loader-v1/loader-v1.component';
import { BaseEditComponent } from './base/base-edit/base-edit.component';
import { EditWorkoutComponent } from './workout/calendar/edit-workout/edit-workout.component';
import { EditWorkoutDescriptionComponent } from './workout/calendar/edit-workout/edit-workout-description/edit-workout-description.component';
import { EditWorkoutPlanComponent } from './workout/calendar/edit-workout/edit-workout-plan/edit-workout-plan.component';
import { LoaderV2Component } from './shared/components/loader-v2/loader-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    WorkoutComponent,
    BaseComponent,
    SupportComponent,
    CalendarComponent,
    CreateComponent,
    ExercisesComponent,
    ExerciseComponent,
    ActivationKeyComponent,
    PreloaderV1Component,
    LoaderV1Component,
    BaseEditComponent,
    EditWorkoutComponent,
    EditWorkoutDescriptionComponent,
    EditWorkoutPlanComponent,
    LoaderV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
