import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public opened: boolean = false;

  constructor() { }

  ngOnInit() { }

  public toggleSidebar() {
    this.opened = !this.opened;
  }
}
