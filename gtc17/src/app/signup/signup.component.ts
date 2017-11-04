import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import coordinates from '../catchment-area.json';
declare let google: any;



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

  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder,
    private _mapsLoader: MapsAPILoader,
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
      street: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(1)]],
      postalCode: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submitMemberForm() {
    let firstName = this.memberForm.controls["firstName"].value;

    console.log(firstName);
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
