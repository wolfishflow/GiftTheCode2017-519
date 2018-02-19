import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('active', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('inactive', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('active => inactive', animate('400ms ease-in-out')),
      transition('inactive => active', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AdminComponent implements OnInit {

  public sidebarState:string = 'inactive';

  constructor() { }

  ngOnInit() { }

  toggleMenu() {
    this.sidebarState = this.sidebarState === 'inactive' ? 'active' : 'inactive';
  }
}
