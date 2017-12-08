import { LoginComponent } from 'app/screens/login/login.component';
import { AdminService } from 'app/screens/admin/admin.service';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { appRouterConfig } from 'app/app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from 'app/app.component';
import { WelcomeComponent } from 'app/screens/welcome/welcome.component';
import { SignupComponent } from 'app/screens/signup/signup.component';
import { RenewComponent } from 'app/screens/renew/renew.component';
import { UpdateComponent } from 'app/screens/update/update.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from 'app/screens/signup/signup.service';
import { HttpModule } from '@angular/http';
import { ConfirmationComponent } from 'app/screens/signup/confirmation/confirmation.component';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { AdminComponent } from 'app/screens/admin/admin.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupComponent,
    RenewComponent,
    UpdateComponent,
    ConfirmationComponent,
    LoginComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRouterConfig, { useHash: false }),
    AgmCoreModule.forRoot({ apiKey: environment.GMAPS_API_KEY, libraries: ['geometry', 'places'] })
  ],
  providers: [
    SignupService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
