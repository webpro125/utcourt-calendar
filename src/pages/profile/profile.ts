import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {Storage} from "@ionic/Storage";
import { Http, Headers} from '@angular/http';
import { Auth } from '../../providers/auth';
import { AuthService } from '../../providers/auth-service';
import * as Constant from '../../providers/constant'
/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile implements OnInit{
  authenticated: any = false;
  profileForm: FormGroup;
  private PROFILE_URL = Constant.PROFILE_URL;
  errorMessage = '';

  constructor(public nav: NavController, private fb: FormBuilder, private auth1: Auth, private storage: Storage, public http: Http, private auth: AuthService) {
    this.auth1.authenticated().then((result) => {
      this.authenticated = true;
      storage.ready().then(() => {
       storage.get('profile').then(profile => {
         this.profileForm.controls.email.setValue(profile.email);
         this.profileForm.controls.name.setValue(profile.name);
         this.profileForm.controls.phone.setValue(profile.phone);
       }).catch(console.log);
      });
    }, (error) => {
      this.nav.setRoot('LoginPage');
      // this.nav.push(LoginPage);
    });
  }

  ngOnInit(): any {
    this.profileForm =  this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      phone: ['', Validators.compose([
        Validators.required,
      ])],
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.compose([Validators.minLength(6)])],
      password_confirmation: ['', Validators.compose([
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
    if (!this.profileForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.profileForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
  }

  profileSubmit() {
    this.auth1.showLoading();
    this.storage.get('token').then((token) => {
      console.log(token);
      let headers = new Headers({"Content-Type": "application/json"});
      headers.append('Authorization', 'Bearer ' + token);


      this.http.post(this.PROFILE_URL, JSON.stringify(this.profileForm.value), {headers: headers}).map(res => res.json())
        .subscribe(
          data => {
            this.storage.set('profile', data);
            this.auth1.showMessage('Saved successfully.', 'Success');
            this.errorMessage = null;
          },
          err => {
            this.auth1.hideLoading();
            if (err.status != 0)
              this.errorMessage = JSON.parse(err._body);
            else {
              this.auth1.showMessage('No Internet Connection', 'Failed');
            }
          },
          () => console.log('Movie Search Complete')
        );
    })
  }

}
