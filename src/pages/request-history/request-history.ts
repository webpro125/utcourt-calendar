import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Helper } from '../../providers/helper';
import { RequestsProvider} from "../../providers/requests";
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

  constructor(public nav: NavController, private helper: Helper, private requestsProvider: RequestsProvider) {

    this.helper.authenticated().then((result) => {
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
    let that = this;

    this.helper.showLoading();
    this.helper.loading.present().then(()=> {
      this.requestsProvider.request_histories(this.pageNo).then((data) => {
        this.helper.hideLoading();
        let histories = JSON.parse(data.histories);
        this.historyCount = data.count;
        if (this.pageNo == 1)
          this.histories = histories;
        else {
          for (let history of histories) {
            this.histories.push(history);
          }
          console.log(this.histories);
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
