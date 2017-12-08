import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from 'app/screens/signup/signup.component';
import { ConfirmationComponent } from 'app/screens/signup/confirmation/confirmation.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SignupComponent,
    ConfirmationComponent
  ],
  exports: [
    SignupComponent,
    ConfirmationComponent
  ]
})
export class SignupModule { }
