import { UpdateComponent } from 'app/screens/update/update.component';
import { AdminComponent } from 'app/screens/admin/admin.component';
import { RenewComponent } from 'app/screens/renew/renew.component';
import { LoginComponent } from 'app/screens/login/login.component';
import { WelcomeComponent } from 'app/screens/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupModule } from 'app/screens/signup/signup.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SignupModule,
    SharedModule,
  ],
  declarations: [
    WelcomeComponent,
    LoginComponent,
    RenewComponent,
    AdminComponent,
    UpdateComponent,
  ],
  exports: [
    WelcomeComponent,
    LoginComponent,
    RenewComponent,
    AdminComponent,
    UpdateComponent,
  ]
})
export class ScreensModule { }
