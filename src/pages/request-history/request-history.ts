import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Storage} from "@ionic/Storage";
import { Http, Headers } from '@angular/http';
import { Auth } from '../../providers/auth';
import * as Constant from '../../providers/constant'
/**
 * Generated class for the RequestHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request-history',
  templateUrl: 'request-history.html',
})
export class RequestHistoryPage {
  authenticated: any = false;
  histories: any;
  historyCount = 0;
  pageNo = 1;

  REQUEST_HISTORY_URL = Constant.REQUEST_HISTORY_URL;

  constructor(public nav: NavController, private auth: Auth, private storage: Storage, public http: Http) {

    this.auth.authenticated().then((result) => {
      this.authenticated = true;
      this.request_history();
    }, (error) => {
      this.nav.setRoot('LoginPage');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestHistoryPage');
  }

  request_history() {
    this.storage.get('token').then((token) => {
      console.log(token);
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);

      this.http.get(this.REQUEST_HISTORY_URL + '?page=' + this.pageNo, {
        headers: headers
      }).map(res => res.json())
        .subscribe(
          data => {
            this.historyCount = data.count;
            let histories = JSON.parse(data.histories);
            if (this.pageNo == 1)
              this.histories = histories;
            else {
              for (let history of histories) {
                this.histories.push(history);
              }
              console.log(this.histories);
            }
            this.pageNo += 1;
          },
          err => console.log(err)
        );
    });
  }

}
