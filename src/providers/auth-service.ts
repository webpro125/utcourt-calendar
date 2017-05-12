import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/Storage";
import * as Constant from '../providers/constant'

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  currentUser: User;

  private SIGNUP_URL = Constant.SIGNUP_URL;
  private SIGNIN_URL = Constant.SIGNIN_URL;
  contentHeader = new Headers({"Content-Type": "application/json"});
  regForm:any;

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello AuthService Provider');

    storage.ready().then(() => {
     storage.get('profile').then(profile => {
       this.currentUser = JSON.parse(profile);
     }).catch(console.log);
    });
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post(this.SIGNIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json());
    }
  }

  public register(credentials) {

    return this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json());
      // At this point store the credentials to your backend!
      //return Observable.create(observer => {
      //  observer.next(true);
      //  observer.complete();
      //});
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

}
