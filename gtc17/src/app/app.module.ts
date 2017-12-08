import { ScreensModule } from 'app/screens/screens.module';
import { MaterialModule } from 'app/material.module';
import { LoginComponent } from 'app/screens/login/login.component';
import { AdminService } from 'app/screens/admin/admin.service';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { appRouterConfig } from 'app/app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from 'app/app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from 'app/screens/signup/signup.service';
import { HttpModule } from '@angular/http';
import { ConfirmationComponent } from 'app/screens/signup/confirmation/confirmation.component';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ScreensModule,
    SharedModule,    
    HttpModule,
    HttpClientModule,
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
