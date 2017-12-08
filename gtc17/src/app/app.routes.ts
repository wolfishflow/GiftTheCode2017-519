import { LoginComponent } from 'app/screens/login/login.component';
import { RenewComponent } from 'app/screens/renew/renew.component';
import { UpdateComponent } from 'app/screens/update/update.component';
import { SignupComponent } from 'app/screens/signup/signup.component';
import { WelcomeComponent } from 'app/screens/welcome/welcome.component';
import { AdminComponent } from 'app/screens/admin/admin.component';
import { AppComponent } from 'app/app.component';
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