import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Loading, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Auth } from '../../providers/auth';
import { HomePage } from '../../pages/home/home';
import {Storage} from "@ionic/Storage";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  loggedIn: boolean = false;
  errorMessage = '';

  ngOnInit(): any {

  }
  constructor(public navCtrl: NavController, public auth1: Auth, private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private storage: Storage) {
    this.auth1.authenticated().then((result) => {
      this.nav.setRoot(HomePage);
      this.nav.push(HomePage);
    }, (error) => {
    });
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(
      data => {
        this.authSuccess(data.data);
        this.nav.push(HomePage);
      },
      err => {
        this.showError("Your credentails are not correct!");
      },
      () => console.log('Login Complete')
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  public authSuccess(user) {
    this.storage.set('profile', user);
  }
}
