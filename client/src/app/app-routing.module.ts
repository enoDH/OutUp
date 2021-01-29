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
                path: 'workout/:id', component: CalendarComponent
            },
            {
                path: 'workout/:id/:id', component: ExercisesComponent
            },
            {
                path: 'create', component: CreateComponent
            },
            {
                path: 'base', component: BaseComponent
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
