import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public oneSelected: boolean = false;
  public twoSelected: boolean = false;
  public threeSelected: boolean = false;
  public route: String = '';

  constructor(private router: Router) { }

  ngOnInit() { }

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

  routeToTask() {
    if (this.oneSelected || this.twoSelected || this.threeSelected) {
      this.router.navigate([this.route]);
    }

  }



}
