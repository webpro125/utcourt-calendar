import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {EnvVariables} from '../app/env/env.token';
import {Storage} from "@ionic/Storage";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  PROFILE_URL;
  constructor(public http: Http, @Inject(EnvVariables) public envs, private storage: Storage) {
    this.PROFILE_URL = envs.apiEndpoint + envs.profileURL;
    console.log('Hello UserProvider Provider');
  }
  profileSubmit(formData):any {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let headers = new Headers({"Content-Type": "application/json"});
        headers.append('Authorization', 'Bearer ' + token);
        this.http.post(this.PROFILE_URL, formData, {headers: headers})
          .map(res => res.json()).subscribe(
          data => {
            resolve(data)
          },
          error => {
            reject(JSON.parse(error._body))
          }
        )
      });
    });
  }

}
