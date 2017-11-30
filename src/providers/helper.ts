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
export class Helper {
  public loading: Loading;

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
      dismissOnPageChange: false
    });
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = null;
  }
  showMessage(text, type) {
    let alert = this.alertCtrl.create({
      title: type,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  authSuccess(data) {
    return new Promise((resolve, reject) => {
      this.storage.set('profile', data.user);
      this.storage.set('token', data.auth_token).then(() => {
        resolve(true);
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.storage.remove('profile');
      this.storage.remove('token').then(() => {
        resolve(true);
      });
    });
  }
  getProfile():any {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get('profile').then(profile => {
          resolve(profile)
        }).catch(console.log);
      });
    });
  }
  setProfile(data) {
    this.storage.set('profile', data);
  }
}
