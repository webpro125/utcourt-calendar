import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/Storage";

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  constructor(public http: Http, private storage: Storage) {

  }
  public authenticated() {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get('profile').then(profile => {
          if (profile)
            resolve(profile);
          else
            reject(false);
        }).catch(console.log);
      });

    });

  }

}
