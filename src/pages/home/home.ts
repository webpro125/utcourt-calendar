import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import {Storage} from "@ionic/Storage";
import { Http, Headers } from '@angular/http';
import * as Constant from '../../providers/constant'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private REQUEST_URL = Constant.REQUEST_URL;

  authenticated: boolean = false;
  requests: any;
  requestCount = 0;
  pageNo = 1;
  constructor(private menu: MenuController, public nav: NavController, private auth: Auth, private storage: Storage, public http: Http) {
    this.menu.enable(true, 'myMenu');
    this.auth.authenticated().then((result) => {
      this.authenticated = true;
      this.request_info();
    }, (error) => {
      this.nav.setRoot('LoginPage');
      // this.nav.push(LoginPage);
    });
  }

  request_info() {

    this.storage.get('token').then((token) => {
      console.log(token);
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);

      this.http.get(this.REQUEST_URL + '?page=' + this.pageNo, {
        headers: headers
      }).map(res => res.json())
        .subscribe(
          data => {
            this.requestCount = data.count;
            if (this.pageNo == 1)
              this.requests = data.requests;
            else {
              for (let request of data.requests) {
                this.requests.push(request);
              }
              console.log(this.requests);
            }
            this.pageNo += 1;
          },
          err => console.log(err)
        );
    });
  }


}
