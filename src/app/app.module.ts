import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatSnackBarModule, MatTabsModule, MatChipsModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
// import { HomeComponent } from './public/home/home.component';
// import { AboutComponent } from './public/about/about.component';
// import { ContactComponent } from './public/contact/contact.component';
// import { TeamsComponent } from './public/teams/teams.component';
// import { HowItWorksComponent } from './public/how-it-works/how-it-works.component';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorComponent } from './error/error.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
// import { UserClassificationComponent } from './_shared/user-classification/user-classification.component';
import { NotActivatedComponent } from './not-activated/not-activated.component';
import { EllipsisPipe } from './_pipes/ellipsis-pipe';
import { ReplacePipe } from './_pipes/replace-pipe';
import { SlugifyPipe } from './_pipes/slugify-pipe';

@NgModule({
  declarations: [
    AppComponent,
    EllipsisPipe,
    ReplacePipe,
    SlugifyPipe,
    NavComponent,
    DashboardComponent,
    AuthComponent,
    PageNotFoundComponent,
    ErrorComponent,
    PromptDialogComponent,
    FooterComponent,
    NotActivatedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    MatChipsModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent,
    PromptDialogComponent
  ]
})
export class AppModule { }
