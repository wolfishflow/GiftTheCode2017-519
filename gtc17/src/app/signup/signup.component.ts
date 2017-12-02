import { Observable } from 'rxjs/Observable';
// import { MatDatepickerModule, MatCheckboxModule, MatDatepicker } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SignupService } from './signup.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';

import { MapsAPILoader, AgmCoreModule } from '@agm/core';

import coordinates from '../catchment-area.json';
declare let google: any;


import { Member } from '../shared/Member';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('autocomplete') set content(content: ElementRef) {

    if (content) {
      this.autocompleteInput = content.nativeElement;

      this.initGoogleMaps();
    }

  }
  public programs: Array<any> = [
    { id: 1, name: "Newcome & Settlement Services" },
    { id: 2, name: "Queer and Trans Family Events" },
    { id: 3, name: "Family Resource Centre Drop-In Programs" },
    { id: 4, name: "Older LGBTQ Drop-In" },
    { id: 5, name: "Housing Support for LGBTQ Youth" },
    { id: 6, name: "Trans Youth Programs" },
    { id: 7, name: "Meal Trans" },
    { id: 8, name: "Sunday Drop-In" },
    { id: 9, name: "Volunteering at The 519" },
    { id: 10, name: "Green Space Festival" },
    { id: 11, name: "Special Events at The 519" },
  ]
  public currentStep: number = 0;
  public memberForm: FormGroup;
  public triangulate: any = undefined;
  public catchmentAreaCoords: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public member: Member;
  public status: string = "individual";

  public individualSelected: boolean = true;
  public mailAddressSelected: boolean = true;
  public homeAddress: boolean = true;
  private geocode_options = { types: ['address'], componentRestrictions: { country: "ca" } };
  private autocompleteInput: any;
  public picker: any;

  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder,
    private _mapsLoader: MapsAPILoader,
    private router: Router,
  ) {


  }

  ngOnInit() {


    const nameRegex = /[a-zA-z]/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const birthDateRegex = /\d{2}\/\d{2}\/\d{4}/;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    //create member formgroup
    this.memberForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.pattern(nameRegex)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.pattern(nameRegex)]],
      birthDate: ['', [Validators.required], Validators.pattern(birthDateRegex)],
      programs: this.formBuilder.array([]),
      streetAddress: ['', [Validators.required, Validators.minLength(1)]],
      aptNumber: ['', [Validators.required, Validators.minLength(1)]],
      streetNumber: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(1)]],
      province: ['-1', [Validators.required, Validators.minLength(1), ]],
      country: ['-1', [Validators.required, Validators.minLength(1)]],
      postalcode: ['', [Validators.required, Validators.minLength(1), Validators.pattern(postalCodeRegex)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.pattern(emailRegex)]],
      permissionForSoliticing: [false, [Validators.required]],
      permissionForNewsletter: [false, [Validators.required]],
      preferredPhone: ['', [Validators.required, Validators.minLength(1)]],
      testimony: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', ],
      confirmPassword: ['', []]
    }, {
      validator: this.matchPassword
    });
  }
  matchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         AC.get('confirmPassword').setErrors( {matchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }

  onCheckboxChanged(program: any, isChecked) {
    const programsFormArray = <FormArray>this.memberForm.controls.programs;

    if (isChecked) {
      programsFormArray.push(new FormControl(program));
    } else {
      let index = programsFormArray.controls.findIndex(x => x.value == program)
      programsFormArray.removeAt(index);
    }
  }

  submitMemberForm() {

    let memberId;
    let firstName = this.memberForm.controls["firstName"].value;
    let lastName = this.memberForm.controls["lastName"].value;
    let birthdate = this.memberForm.controls["birthDate"].value;
    let programs = this.memberForm.controls["programs"].value;
    let streetAddress = this.memberForm.controls["streetAddress"].value;
    let aptNumber = this.memberForm.controls["aptNumber"].value;;
    let streetNumber = this.memberForm.controls["streetNumber"].value;
    let city = this.memberForm.controls["city"].value;
    let postalcode = this.memberForm.controls["postalcode"].value;
    let email = this.memberForm.controls["email"].value;
    let province = this.memberForm.controls["province"].value;
    let country = this.memberForm.controls["country"].value;
    let preferredPhone = this.memberForm.controls["preferredPhone"].value;
    let permissionForSoliticing = this.memberForm.controls["permissionForSoliticing"].value;
    let permissionForNewsletter = this.memberForm.controls["permissionForNewsletter"].value;

    let password = this.memberForm.controls["password"].value;
    let testimony = this.memberForm.controls["testimony"].value;
    let status = this.status;


    //append address components here in one giant string
    let formatted_address = `${streetNumber} ${streetAddress} ${city}, ${province} ${postalcode},     ${country}`;

    console.log(formatted_address);


    this.triangulate(formatted_address).subscribe(within_bounds => {
      this.member = new Member(memberId, firstName, lastName, birthdate, programs, streetAddress, aptNumber, streetNumber, city, province, country,
        postalcode, within_bounds, email, permissionForSoliticing, permissionForNewsletter, status, preferredPhone, testimony, password);
      this.currentStep = this.currentStep + 1;

      console.log(JSON.stringify(this.member));
      this.createMember(this.member);

    },
      (error) => {
        this.member = new Member(memberId, firstName, lastName, birthdate, programs, streetAddress, aptNumber, streetNumber, city, province, country,
          postalcode, false, email, permissionForSoliticing, permissionForNewsletter, status, preferredPhone, testimony, password);

        this.currentStep = this.currentStep + 1;
        this.createMember(this.member);
      

        console.log(JSON.stringify(this.member));


      })



  }

  createMember(member: Member) {
    this.signupService.createMember(member).takeUntil(this.ngUnsubscribe).subscribe(
      member => {

       }
    )
  }

  routeToWelcome() {
    this.router.navigate(['welcome']);
  }

  toggleIndividualSelection() {
    this.individualSelected = !this.individualSelected;
    (this.individualSelected) ? this.status = "individual" : this.status = "household";
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

  setPermissionSoliticing(event) {
    this.memberForm.controls.permissionForSoliticing.setValue(event.checked);
  }
  setPermissionNewsletter(event) {
    this.memberForm.controls.permissionForNewsletter.setValue(event.checked)
  }

  initGoogleMaps(): void {
    //load google maps autocomplete
    this._mapsLoader.load().then(() => {



      //store catchment area coordinates 
      this.catchmentAreaCoords = this.createCoords();


      //create polygon
      let catchmentAreaPolygon = new google.maps.Polygon({ paths: this.catchmentAreaCoords });

      //create geocoder object
      const geocoder = new google.maps.Geocoder(this.geocode_options);

      // set callback for checking point exists within catchment area
      this.triangulate = (address: string): Observable<boolean> => {
        console.log(`address is ${address}`)
        return Observable.create(observer => {
          geocoder.geocode({ 'address': address }, (results, status) => {

            if (status == 'OK') {

              console.log
              console.log(results)

              //check if geocoded coordinate is within the catchment area
              const within_bounds: boolean = google.maps.geometry.poly.containsLocation(results[0].geometry.location, catchmentAreaPolygon);
              return observer.next(within_bounds)
            } else {
              console.log("went here")
              observer.next(false)
            }
          });
        });
      };



      this.autocompleteInput = new google.maps.places.Autocomplete(document.getElementById("autocomplete"), this.geocode_options);
      google.maps.event.addListener(this.autocompleteInput, 'place_changed', () => {

        //auto fill fields
        let place = this.autocompleteInput.getPlace();

        //all autocompletes are defaulted to Canada
        this.memberForm.controls.country.setValue("CA");

        for (let item of place.address_components) {

          let type = item.types[0];

          if (type === "street_number") {
            this.memberForm.controls.streetNumber.setValue(item.short_name);
            this.memberForm.controls.streetNumber.markAsDirty();
          }
          else if (type === "route") {
            this.memberForm.controls.streetAddress.setValue(item.short_name);
            this.memberForm.controls.streetAddress.markAsDirty();
          }
          else if (type === "locality") {
            this.memberForm.controls.city.setValue(item.short_name);
            this.memberForm.controls.city.markAsDirty();
          }
          else if (type === "administrative_area_level_1") {
            this.memberForm.controls.province.setValue(item.short_name);
            this.memberForm.controls.province.markAsDirty();
          }
          else if (type === "postal_code") {
            this.memberForm.controls.postalcode.setValue(item.short_name);
            this.memberForm.controls.postalcode.markAsDirty();
          }

        }


      });
    });
  }

  createCoords(): Array<any> {
    const coords = [];
    coordinates.features[1].geometry.coordinates[0].forEach(element => {
      const [lng, lat] = element;
      let latlng = { lat: lat, lng: lng };
      coords.push(latlng);
    });
    return coords;
  }

  onPickerFocused(picker: any): void {
    console.log(picker);
    
    picker.open()
  }

  onPickerBlur(picker: any): void {
    console.log(picker)
    picker.close()
    
  }
  //ngif memForm.controls.fieldname.hasError{}


}
