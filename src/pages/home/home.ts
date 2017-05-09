import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import {Storage} from "@ionic/Storage";
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  authenticated: boolean = false;
  constructor(public nav: NavController, private auth: Auth, private storage: Storage) {
    this.auth.authenticated().then((result) => {
      this.authenticated = true;
    }, (error) => {
      this.nav.setRoot(LoginPage);
      this.nav.push(LoginPage);
    });
  }

  logout() {
    this.storage.remove('token');
    this.storage.remove('profile');
    this.nav.setRoot(LoginPage);
    this.nav.push(LoginPage);
  }
}
