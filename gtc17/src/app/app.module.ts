import { environment } from './../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { appRouterConfig } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule} from 'ng-sidebar';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { RenewComponent } from './renew/renew.component';
import { UpdateComponent } from './update/update.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './signup/signup.service';
import { HttpModule } from '@angular/http';
import { ConfirmationComponent } from './signup/confirmation/confirmation.component';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component'
import { HttpClientModule } from '@angular/common/http';
import { ExportComponent } from './admin/export/export.component';
import { ExportService } from './admin/export/export.service';
import { SidebarComponent } from './admin/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupComponent,
    RenewComponent,
    UpdateComponent,
    ConfirmationComponent,
    AdminComponent,
    ExportComponent,
    SidebarComponent,
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
    SidebarModule.forRoot(),
    RouterModule.forRoot(appRouterConfig, { useHash: false }),
    AgmCoreModule.forRoot({ apiKey: environment.GMAPS_API_KEY, libraries: ['geometry', 'places'] })
  ],
  providers: [
    SignupService,
    ExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
