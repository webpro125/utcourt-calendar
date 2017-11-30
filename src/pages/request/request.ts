import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Helper } from '../../providers/helper';
import { RequestsProvider} from "../../providers/requests";
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
  request = { client_name: '', date: new Date().toISOString(), time: '', range: 15, court_location: null, hearing: '', notes: '' };
  courtLocations: any;
  hearings: Array<{label: string, value: any}>;

  constructor(public nav: NavController, private helper: Helper, private  requestProvider: RequestsProvider) {
    this.helper.authenticated().then((result) => {
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
    if (this.request.court_location === '') {

    }
    this.helper.showLoading();
    this.helper.loading.present().then(()=> {
      this.requestProvider.requestSubmit(JSON.stringify(this.request)).then((data) => {
          this.helper.hideLoading();
          this.helper.showMessage('Your request has been sent to ' + data.length + ' Attorneys', 'Success');
        },
        err => {
          this.helper.hideLoading();
        },
        () => console.log('request submit')
      );
    });
  }

  getCourtLocations() {
    this.requestProvider.getCourtLocations().then( data => {
      this.courtLocations = data;
    });
  }
}
