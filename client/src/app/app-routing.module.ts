import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './general/base/base.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SupportComponent } from './general/support/support.component';
import { CalendarComponent } from './general/workout/calendar/calendar.component';
import { CreateComponent } from './general/create/create.component';
import { WorkoutComponent } from './general/workout/workout.component';
import { ExercisesComponent } from './general/workout/calendar/exercises/exercises.component';
import { ExerciseComponent } from './general/workout/calendar/exercises/exercise/exercise.component';
import { ActivationKeyComponent } from './general/activation-key/activation-key.component';
import { BaseEditComponent } from './general/base/base-edit/base-edit.component';
import { EditWorkoutComponent } from './general/workout/calendar/edit-workout/edit-workout.component';
import { EditWorkoutDescriptionComponent } from './general/workout/calendar/edit-workout/edit-workout-description/edit-workout-description.component';
import { EditWorkoutPlanComponent } from './general/workout/calendar/edit-workout/edit-workout-plan/edit-workout-plan.component';
import { ConfirmEmailComponent } from './auth/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './auth/reset/reset-password/reset-password.component';
import { ResetConfirmComponent } from './auth/reset/reset-confirm/reset-confirm.component';
import { ResetPasswordLayoutComponent } from './shared/layouts/auth-layout/reset-password-layout/reset-password-layout.component';
import { ResetPasswordDoneComponent } from './auth/reset/reset-password-done/reset-password-done.component';
import { ChatComponent } from './general/chat/chat.component';

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {
                path: '', redirectTo: '/login', pathMatch: 'full'
            },
            {
                path: 'login', component: LoginPageComponent
            },
            {
                path: 'register', component: RegisterPageComponent
            },
            {
                path: 'reset-password', component: ResetPasswordLayoutComponent, children: [
                    {
                        path: '', component: ResetPasswordComponent
                    },
                    {
                        path: 'confirm', component: ResetConfirmComponent
                    },
                    {
                        path: 'reset', component: ResetPasswordDoneComponent
                    }
                ]
            }
        ]
    },
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            {
                path: 'workout', component: WorkoutComponent
            },
            {
                path: 'activation', component: ActivationKeyComponent
            },
            {
                path: 'confirm-email', component: ConfirmEmailComponent
            },
            {
                path: 'chat', component: ChatComponent
            },
            {
                path: 'workout/:id', component: CalendarComponent
            },
            {
                path: 'editworkout', component: EditWorkoutComponent, children: [
                    {
                        path: 'description', component: EditWorkoutDescriptionComponent
                    },
                    {
                        path: 'plan', component: EditWorkoutPlanComponent
                    }
                ]
            },
            {
                path: 'exercises', component: ExercisesComponent
            },
            {
                path: 'exercise', component: ExerciseComponent
            },
            {
                path: 'create', component: CreateComponent
            },
            {
                path: 'base', component: BaseComponent
            },
            {
                path: 'base/:id', component: BaseEditComponent
            },
            {
                path: 'support', component: SupportComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
