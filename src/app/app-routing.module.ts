import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { ContactComponent } from './public/contact/contact.component';
import { TeamsComponent } from './public/teams/teams.component';

import { AuthGuard } from './auth/auth-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'setup', loadChildren: './setup/setup.module#SetupModule'},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    {
        path: 'classification',
        loadChildren: './private/classification/classification.module#ClassificationModule',
        canActivate: [AuthGuard]
    },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false, preloadingStrategy: PreloadAllModules }
        )
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {

}

