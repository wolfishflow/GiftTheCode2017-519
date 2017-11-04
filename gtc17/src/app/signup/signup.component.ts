import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public currentStep: number = 0;
  public memberForm: FormGroup;

  constructor(private signupService: SignupService,
              private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.memberForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName:  ['', [Validators.required, Validators.minLength(1)]],
      birthDate: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(1)]],
      postalCode: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submitMemberForm() {
    let firstName = this.memberForm.controls["firstName"].value;
    
    console.log(firstName);
  }

  //ngif memForm.controls.fieldname.hasError{}


}
