import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Storage} from "@ionic/Storage";
import { Http, Headers } from '@angular/http';
import { Auth } from '../../providers/auth';
import * as Constant from '../../providers/constant'
/**
 * Generated class for the Request page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class Request {
  authenticated: any = false;
  request = { client_name: '', date: new Date().toISOString(), time: '', range: 15, court_location: '', hearing: '', notes: '' };
  courtLocations: any;
  hearings: Array<{label: string, value: any}>;
  private REQUEST_URL = Constant.REQUEST_URL;
  private COURT_LOCATIONS_URL = Constant.COURT_LOCATIONS_URL;

  constructor(public nav: NavController, private auth: Auth, private storage: Storage, public http: Http) {
    this.auth.authenticated().then((result) => {
      this.authenticated = true;
    }, (error) => {
      this.nav.setRoot('LoginPage');
      // this.nav.push(LoginPage);
    });

    this.getCourtLocations();
    this.hearings = [
      {value: 'Initial Appearance', label: 'Initial Appearance'},
      {value: 'Arraignment', label: 'Arraignment'},
      {value: 'Pretrial Conference', label: 'Pretrial Conference'},
      {value: 'Waiver', label: 'Waiver'},
      {value: 'Decision to Prelim', label: 'Decision to Prelim'},
      {value: 'Status Conference', label: 'Status Conference'},
      {value: 'Roll Call', label: 'Roll Call'},
      {value: 'Other(explain in notes)', label: 'Other(explain in notes)'},
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Request');
  }
  requestSubmit() {
    this.storage.get('token').then((token) => {
      console.log(token);
      let headers = new Headers({"Content-Type": "application/json"});
      headers.append('Authorization', 'Bearer ' + token);
      this.auth.showLoading();
      this.http.post(this.REQUEST_URL, JSON.stringify(this.request), {headers: headers}).map(res => res.json())
        .subscribe(
          data => {
            this.auth.showMessage('Your request has been sent to ' + data.length + ' Attorneys', 'Success');
          },
          err => console.log(err)
        );
    })
  }

  getCourtLocations() {
    this.storage.get('token').then((token) => {
      console.log(token);
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);

      this.http.get(this.COURT_LOCATIONS_URL, {
        headers: headers
      }).map(res => res.json())
        .subscribe(
          data => {
              this.courtLocations = data;
              console.log(this.courtLocations);
          },
          err => console.log(err)
        );
    });
  }
}
