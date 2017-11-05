import { Observable } from 'rxjs/Observable';
import { MatDatepickerModule, MatCheckboxModule } from '@angular/material';
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

  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder,
    private _mapsLoader: MapsAPILoader,
    private router: Router,
  ) {


  }

  ngOnInit() {



    //initialize google maps services


    //create member formgroup
    this.memberForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      birthDate: ['', [Validators.required]],
      programs: this.formBuilder.array([]),
      streetAddress: ['', [Validators.required, Validators.minLength(1)]],
      aptNumber: ['', [Validators.required, Validators.minLength(1)]],
      streetNumber: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(1)]],
      province: ['', [Validators.required, Validators.minLength(1)]],
      country: ['', [Validators.required, Validators.minLength(1)]],
      postalcode: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1)]],
      preferredPhone: ['', [Validators.required, Validators.minLength(1)]],
      membershipDetails: ['', [Validators.required, Validators.minLength(1)]]
    });
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
    let streetAddress = this.memberForm.controls["streetAddress"].value;
    let aptNumber = this.memberForm.controls["aptNumber"].value;;
    let streetNumber = this.memberForm.controls["streetNumber"].value;
    let city = this.memberForm.controls["city"].value;
    let postalcode = this.memberForm.controls["postalcode"].value;
    let email = this.memberForm.controls["email"].value;
    let province = this.memberForm.controls["province"].value;
    let country = this.memberForm.controls["country"].value;
    let preferredPhone = this.memberForm.controls["preferredPhone"].value;
    let membershipDetails = this.memberForm.controls["membershipDetails"].value;

    let status = this.status;

    let formatted_address = `${streetNumber} ${streetAddress}, ${city}, ${province}, ${country}`;
    console.log(formatted_address)
    this.triangulate().subscribe(within_bounds => {
      this.member = new Member(memberId, firstName, lastName, birthdate, streetAddress, aptNumber, streetNumber, city, province, country,
        postalcode, within_bounds, email, status, preferredPhone, membershipDetails);
    },
      (error) => {
        this.member = new Member(memberId, firstName, lastName, birthdate, streetAddress, aptNumber, streetNumber, city, province, country,
          postalcode, false, email, status, preferredPhone, membershipDetails);
      })



    this.currentStep = this.currentStep + 1;
    //this.createMember(member)
  }

  createMember(member: Member) {
    this.signupService.createMember(member).takeUntil(this.ngUnsubscribe).subscribe(
      member => { }
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

        //append address components here in one giant string
        console.log(address);

        return Observable.create(observer => {
          geocoder.geocode({ 'address': address }, (results, status) => {

            if (status == 'OK') {

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

        let formatted_address = this.autocompleteInput.getPlace().formatted_address;

        //triangulate address
        this.triangulate(formatted_address).subscribe(val => {

          // set the member within/not within bounds field to `val`
          this.member.withinCatchmentArea = val;

        });
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

  //ngif memForm.controls.fieldname.hasError{}


}
