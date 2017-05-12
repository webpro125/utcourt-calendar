import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
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
  loading: Loading;

  constructor(public http: Http, private storage: Storage, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }
  showMessage(text, type) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: type,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
