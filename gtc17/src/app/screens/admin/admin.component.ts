import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public showCharts: boolean = true;
  constructor(private adminService: AdminService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  submitSearch() {
    this.showCharts = false;
  }

  exportCsv() {
    console.log("got ehre");
    //this.adminService.createCSV();
    this.http.get("http://localhost:8080/api/export").subscribe(data => {
      console.log(data);
    });
  }

}
