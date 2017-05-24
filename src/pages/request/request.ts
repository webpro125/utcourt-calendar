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
  request = { court_name: '', date: new Date().toISOString(), time: '', range: 15, court: '', hearing: '', notes: '' };
  courts: Array<{label: string, value: any}>;
  hearings: Array<{label: string, value: any}>;
  private REQUEST_URL = Constant.REQUEST_URL;

  constructor(public nav: NavController, private auth: Auth, private storage: Storage, public http: Http) {
    this.courts = [
      {value: 'Abstract of Judgment (AJ)', label: 'Abstract of Judgment (AJ)'},
      {value: 'Administrative Ag (AA)', label: 'Administrative Ag (AA)'},
      {value: 'Arbitration Award (AW)', label: 'Arbitration Award (AW)'},
      {value: 'Asbestos (AS)', label: 'Asbestos (AS)'},
      {value: 'Attorney Discipline (AT)', label: 'Attorney Discipline (AT)'},
      {value: 'Child Support Lien (SL)', label: 'Child Support Lien (SL)'},
      {value: 'Civil Rights (CR)', label: 'Civil Rights (CR)'},
      {value: 'Civil Stalking (SK)', label: 'Civil Stalking (SK)'},
    ];
    this.hearings = [
      {value: 'Arrangement', label: 'Arrangement'},
      {value: 'Waiver of Prelim', label: 'Waiver of Prelim'},
    ];
    this.auth.authenticated().then((result) => {
      this.authenticated = true;
    }, (error) => {
      this.nav.setRoot('LoginPage');
      // this.nav.push(LoginPage);
    });
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
}
