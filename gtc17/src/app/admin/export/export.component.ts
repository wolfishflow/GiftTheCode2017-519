import { Component, OnInit } from '@angular/core';
import { ExportService } from './export.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  constructor(private exportService: ExportService) { }

  ngOnInit() { }

  exportCsv() {
    this.exportService.createCSV().subscribe(
      csv => {
      FileSaver.saveAs(csv, 'export.csv');
    }, err => {
      console.error(err);
    });
  }

}
