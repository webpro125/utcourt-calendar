import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import {Storage} from "@ionic/Storage";
import { Http, Headers } from '@angular/http';
// import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  authenticated: boolean = false;
  constructor(private menu: MenuController, public nav: NavController, private auth: Auth, private storage: Storage, public http: Http) {
    this.menu.enable(true, 'myMenu');
    this.auth.authenticated().then((result) => {
      this.authenticated = true;
    }, (error) => {
      this.nav.setRoot('LoginPage');
      // this.nav.push(LoginPage);
    });
  }

  user_info() {

    this.storage.get('token').then((token) => {
      console.log(token);
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);

      this.http.get('http://192.168.77.153:3000/api/user_info', {
        headers: headers
      }).map(res => res.json())
        .subscribe(
          data => console.log(data),
          err => console.log(err)
        );
    })
  }


}
