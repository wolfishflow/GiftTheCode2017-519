import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Member } from "app/classes/Member";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {

  public apiRoute = "http://localhost:8080/api/export";

  constructor(private http: Http) {}

  createCSV() {
    console.log("and i got here");
    this.http.get(this.apiRoute);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

}