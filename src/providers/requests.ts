import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {EnvVariables} from '../app/env/env.token';
import {Storage} from "@ionic/Storage";
/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsProvider {
  REQUESTS_URL;
  COURT_LOCATIONS_URL;
  REQUEST_HISTORY_URL;
  constructor(public http: Http, @Inject(EnvVariables) public envs, private storage: Storage) {
    console.log('Hello RequestsProvider Provider');
    this.REQUESTS_URL = envs.apiEndpoint + envs.requestURL;
    this.COURT_LOCATIONS_URL = envs.apiEndpoint + envs.courtLocationsURL;
    this.REQUEST_HISTORY_URL = envs.apiEndpoint + envs.requestHistoryURL;
  }

  getRequests(pageNo):any {
    let requestUrl = this.REQUESTS_URL + '?page=' + pageNo;
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.http.get(requestUrl, {headers: headers})
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

  getCourtLocations():any {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.http.get(this.COURT_LOCATIONS_URL, {headers: headers})
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

  requestSubmit(formData):any {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let headers = new Headers({"Content-Type": "application/json"});
        headers.append('Authorization', 'Bearer ' + token);
        this.http.post(this.REQUESTS_URL, formData, {headers: headers})
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

  request_histories(pageNo):any {
    let requestUrl = this.REQUEST_HISTORY_URL + '?page=' + pageNo;
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.http.get(requestUrl, {headers: headers})
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
