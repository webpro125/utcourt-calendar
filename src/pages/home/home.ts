import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { Helper } from '../../providers/helper';
import { RequestsProvider} from "../../providers/requests";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authenticated: boolean = false;
  requests: any;
  requestCount = 0;
  pageNo = 1;
  constructor(private menu: MenuController, public nav: NavController, private helper: Helper, private requestsProvider: RequestsProvider) {
    this.menu.enable(true, 'myMenu');
    this.helper.authenticated().then((result) => {
      this.authenticated = true;
      this.request_info();
    }, (error) => {
      this.nav.setRoot('LoginPage');
      // this.nav.push(LoginPage);
    });
  }

  request_info() {

    let that = this;

    this.helper.showLoading();
    this.helper.loading.present().then(()=> {
      this.requestsProvider.getRequests(this.pageNo).then((data) => {
        this.helper.hideLoading();
        this.requestCount = data.count;
        if (this.pageNo == 1) {
          this.requests = data.requests;
        } else {
          for (let request of data.requests) {
            this.requests.push(request);
          }
        }
        this.pageNo += 1;
      }, (error) => {
        /*this.helper.hideLoading();*/
        if (error === 'token_expired' || error === 'token_invalid')
          this.helper.showMessage('Token Expired. we let you logout for security', 'Notification');
        window.setTimeout(function () {
          that.helper.logout().then(() => {
            that.nav.setRoot('LoginPage');
          })
        }, 3000);
      });
    });
  }
}
