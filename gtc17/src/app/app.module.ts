import { environment } from './../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { appRouterConfig } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { RenewComponent } from './renew/renew.component';
import { UpdateComponent } from './update/update.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './signup/signup.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupComponent,
    RenewComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouterConfig, { useHash: false }),
    AgmCoreModule.forRoot({apiKey: environment.GMAPS_API_KEY, libraries: ['geometry', 'places']})
  ],
  providers: [
    SignupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
