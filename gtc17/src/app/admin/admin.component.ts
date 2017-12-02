import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public showCharts: boolean = true;
  constructor(private adminService: AdminService,
              private http: HttpClient) { }

  ngOnInit() { }

  submitSearch() {
    this.showCharts = false;
  }

  exportCsv() {
    this.adminService.createCSV().subscribe(
      csv => {
      FileSaver.saveAs(csv, 'export.csv');
    }, err => {
      console.error(err);
    });
  }

}
