import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorText: string;

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', []]
    });
  }

  login() {
    this._loginService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
      

      // this._router.navigate([""]);
  }
}
