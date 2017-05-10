import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {Storage} from "@ionic/Storage";
import { HomePage } from '../../pages/home/home';
import { Auth } from '../../providers/auth';
/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  createSuccess = false;
  registerCredentials = { email: '', password: '', password_confirmation: '' };

  regForm: FormGroup;
  error = false;
  errorMessage = '';
  userEmail: string;
  userId: number;

  constructor(private nav: NavController, private auth: AuthService, private fb: FormBuilder, private alertCtrl: AlertController, private storage: Storage, private auth1: Auth) {
    //storage.ready().then(() => {
    //  storage.get('profile').then(profile => {
    //    this.userEmail = profile.email;
    //    this.userId = profile.id;
    //  }).catch(console.log);
    //});
    this.auth1.authenticated().then((result) => {
        this.nav.setRoot(HomePage);
        // this.nav.push(HomePage);
      }, (error) => {
    });
  }



  ngOnInit(): any {
    this.regForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])],
    });
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.regForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.regForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  public register() {

    if (this.regForm.valid) {
      this.auth.register(this.regForm.value).subscribe(
        data => {
          this.authSuccess(data);
          this.nav.setRoot(HomePage);
        },
        err => {
          console.log(err);
          this.errorMessage = JSON.parse(err._body).errors;
        },
        () => console.log('Movie Search Complete')
      );
    }
  }
  public authSuccess(user) {
    this.error = null;
    this.storage.set('profile', user.user);
    this.storage.set('token', user.auth_token);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
