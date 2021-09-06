import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { WorkoutComponent } from './general/workout/workout.component';
import { BaseComponent } from './general/base/base.component';
import { SupportComponent } from './general/support/support.component';
import { CalendarComponent } from './general/workout/calendar/calendar.component';
import { CreateComponent } from './general/create/create.component';
import { ExercisesComponent } from './general/workout/calendar/exercises/exercises.component';
import { ExerciseComponent } from './general/workout/calendar/exercises/exercise/exercise.component';
import { ActivationKeyComponent } from './general/activation-key/activation-key.component';
import { PreloaderV1Component } from './shared/components/preloader-v1/preloader-v1.component';
import { LoaderV1Component } from './shared/components/loader-v1/loader-v1.component';
import { BaseEditComponent } from './general/base/base-edit/base-edit.component';
import { EditWorkoutComponent } from './general/workout/calendar/edit-workout/edit-workout.component';
import { EditWorkoutDescriptionComponent } from './general/workout/calendar/edit-workout/edit-workout-description/edit-workout-description.component';
import { EditWorkoutPlanComponent } from './general/workout/calendar/edit-workout/edit-workout-plan/edit-workout-plan.component';
import { LoaderV2Component } from './shared/components/loader-v2/loader-v2.component';
import { ConfirmEmailComponent } from './auth/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './auth/reset/reset-password/reset-password.component';
import { ResetConfirmComponent } from './auth/reset/reset-confirm/reset-confirm.component';
import { ResetPasswordLayoutComponent } from './shared/layouts/auth-layout/reset-password-layout/reset-password-layout.component';
import { ResetPasswordDoneComponent } from './auth/reset/reset-password-done/reset-password-done.component';
import { ChatComponent } from './general/chat/chat.component';

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
    LoaderV2Component,
    ConfirmEmailComponent,
    ResetPasswordComponent,
    ResetConfirmComponent,
    ResetPasswordLayoutComponent,
    ResetPasswordDoneComponent,
    ChatComponent
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
