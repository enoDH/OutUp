import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SupportComponent } from './support/support.component';
import { CalendarComponent } from './workout/calendar/calendar.component';
import { CreateComponent } from './create/create.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExercisesComponent } from './workout/calendar/exercises/exercises.component';
import { ExerciseComponent } from './workout/calendar/exercises/exercise/exercise.component';
import { ActivationKeyComponent } from './activation-key/activation-key.component';
import { BaseEditComponent } from './base/base-edit/base-edit.component';
import { EditWorkoutComponent } from './workout/calendar/edit-workout/edit-workout.component';
import { EditWorkoutDescriptionComponent } from './workout/calendar/edit-workout/edit-workout-description/edit-workout-description.component';
import { EditWorkoutPlanComponent } from './workout/calendar/edit-workout/edit-workout-plan/edit-workout-plan.component';

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
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
