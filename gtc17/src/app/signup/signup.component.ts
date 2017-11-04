import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Member } from '../shared/Member';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public currentStep: number = 0;
  public memberForm: FormGroup;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public individualSelected: boolean = true;
  public mailAddressSelected: boolean = true;
  public homeAddress: boolean = true;

  constructor(private signupService: SignupService,
              private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.memberForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName:  ['', [Validators.required, Validators.minLength(1)]],
      birthDate: ['', [Validators.required]],
      streetAddress: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(1)]],
      province: ['', [Validators.required, Validators.minLength(1)]],
      country: ['', [Validators.required, Validators.minLength(1)]],
      postalcode: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1)]],
      preferredPhone: ['', [Validators.required, Validators.minLength(1)]],
      membershipDetails: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  submitMemberForm() {
    
    let memberId;
    let firstName = this.memberForm.controls["firstName"].value;
    let lastName = this.memberForm.controls["lastName"].value;
    let birthdate;
    // TODO: birthdate
    let streetAddress = this.memberForm.controls["streetAddress"].value;
    let city = this.memberForm.controls["city"].value;
    let postalcode = this.memberForm.controls["postalcode"].value;
    let email = this.memberForm.controls["email"].value;    
    let province = this.memberForm.controls["province"].value;
    let country = this.memberForm.controls["country"].value;
    let preferredPhone = this.memberForm.controls["preferredPhone"].value;
    let membershipDetails = this.memberForm.controls["membershipDetails"].value;

    let member = new Member(memberId, firstName, lastName, birthdate, streetAddress, city, province, country, 
                            postalcode, email, preferredPhone, membershipDetails);
    console.log(member);
    //this.createMember(member)
  }

  createMember(member: Member) {
    this.signupService.createMember(member).takeUntil(this.ngUnsubscribe).subscribe(
      member => { }
    )
  }

  toggleIndividualSelection() {
    this.individualSelected = !this.individualSelected;
  }

  toggleMailSelection() {
    this.mailAddressSelected = !this.mailAddressSelected;
  }

  toggleAddressSelection() {
    this.homeAddress = !this.homeAddress;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  //ngif memForm.controls.fieldname.hasError{}


}
