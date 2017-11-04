import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
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

  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder,
    private _mapsLoader: MapsAPILoader,
    private router: Router,
  ) {


  }

  ngOnInit() {



    //initialize google maps services
    this.initGoogleMaps();


    //create member formgroup
    this.memberForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
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

    let status = this.status;

    this.member = new Member(memberId, firstName, lastName, birthdate, streetAddress, city, province, country,
      postalcode, email, status, preferredPhone, membershipDetails);

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
    this._mapsLoader.load().then(() => {

      //store catchment area coordinates 
      this.catchmentAreaCoords = this.createCoords();

      let geocoder = new google.maps.Geocoder();

      // set callback for checking point exists within catchment area
      this.triangulate = () => {

        //append address components here in one giant string
        const address = "";

        geocoder.geocode({ 'address': address }, (results, status) => {
          if (status == 'OK') {

            console.log("results from geocode are:");

            console.log(results)


            //create polygon
            let catchmentAreaPolygon = new google.maps.Polygon({ paths: this.catchmentAreaCoords });

            let WITHIN_BOUNDS = google.maps.geometry.poly.containsLocation(results[0].geometry.location, catchmentAreaPolygon);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });


      };

    })
  }

  createCoords(): Array<any> {
    const coords = [];
    coordinates.features[1].geometry.coordinates[0].forEach(element => {
      const [lng, lat] = element;
      console.log('element is: ', element)
      let latlng = { lat: lat, lng: lng };
      coords.push(latlng);
    });
    console.log(JSON.stringify(coords))
    return coords;
  }

  //ngif memForm.controls.fieldname.hasError{}


}
