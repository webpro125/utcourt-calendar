import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Helper } from '../../providers/helper';
import { HomePage } from '../../pages/home/home';
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
export class LoginPage {
  loginCredentials = { email: '', password: '' };

  constructor(private menu: MenuController, public helper: Helper, private nav: NavController, private auth: AuthService) {
    this.menu.enable(false, 'myMenu');
    this.helper.authenticated().then((result) => {
      this.nav.setRoot(HomePage);
    }, (error) => {
    });
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.helper.showLoading();
    this.helper.loading.present().then(()=> {
      this.auth.login(this.loginCredentials).subscribe(
        data => {
          this.helper.authSuccess(data).then(() => {
            this.helper.hideLoading();
            this.nav.setRoot(HomePage);
          });

        },
        err => {
          this.helper.showMessage("Your credentials are not correct!", "Failed");
          this.helper.hideLoading();
        },
        () => console.log('Login Complete')
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
