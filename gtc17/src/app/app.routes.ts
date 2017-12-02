import { LoginComponent } from './login/login.component';
import { RenewComponent } from './renew/renew.component';
import { UpdateComponent } from './update/update.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { Routes } from "@angular/router";




export const appRouterConfig: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'signup', component: SignupComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];