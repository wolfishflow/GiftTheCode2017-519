import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public currentStep: number = 0;
  constructor() { }

  ngOnInit() {
  }

  toggleSelectionOne() {
    this.oneSelected = true;
    this.twoSelected = false;
    this.threeSelected = false;
    this.route = 'signup';
  }

  toggleSelectionTwo() {
    this.oneSelected = false;
    this.twoSelected = true;
    this.threeSelected = false;
    this.route = 'renew';
  }

  toggleSelectionThree() {
    this.oneSelected = false;
    this.twoSelected = false;
    this.threeSelected = true;
    this.route = 'update';
  }

}
