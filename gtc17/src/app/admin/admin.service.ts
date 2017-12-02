import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Member } from "../shared/Member";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {

  public apiRoute = "http://localhost:8080/api/export";

  constructor(private http: HttpClient) {}

  createCSV() {
    return this.http.get(this.apiRoute, {responseType: 'blob'})
      .catch(err => this.formatErrors(err));
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

}