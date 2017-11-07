import { Observable } from 'rxjs/Observable';

import { Member } from './shared/Member';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  private _member: Member;
  
  constructor(private _http: Http) { }

  login(email: string, password: string): void {
    this._http.post("http://localhost:8080/api/login", {
      email: email,
      password: password
    }).subscribe(res => {
      let data = res.json();
      console.log(data);

      this._member = new Member(
        data.memberId,
        data.firstName,
        data.lastName,
        data.birthDate,
        null,
        data.street,
        data.apartmentNumber,
        data.streetNumber,
        data.city,
        data.provinceState,
        data.country,
        data.postalCode,
        data.inCatchment,
        data.email,
        data.Permission.permSolicit,
        data.Permission.permNewsletter,
        null,
        data.phone,
        data.Testimony.testimony,
        null
      );
    });


  }

  getMember(): Member {
    return this._member;
  }

}
