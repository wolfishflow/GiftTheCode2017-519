import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Member } from "../shared/Member";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SignupService {

  public apiRoute = "http://localhost:8080/api/save";

  constructor(private http: Http) {}

  createMember(member: Member): Observable<Member> {
    return this.http.post(this.apiRoute, member)
      .catch(this.formatErrors);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
 }

}