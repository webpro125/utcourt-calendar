import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
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

  registerCredentials = { email: '', password: '', password_confirmation: '' };

  regForm: FormGroup;

  errorMessage = '';

  constructor(private menu: MenuController, private nav: NavController, private auth: AuthService, private fb: FormBuilder, private storage: Storage, private auth1: Auth) {
    this.menu.enable(false, 'myMenu');
    //storage.ready().then(() => {
    //  storage.get('profile').then(profile => {
    //    this.userEmail = profile.email;
    //    this.userId = profile.id;
    //  }).catch(console.log);
    //});
    this.auth1.authenticated().then((result) => {
        this.nav.setRoot(HomePage);
      }, (error) => {
    });
  }



  ngOnInit(): any {
    this.regForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      first_name: ['', Validators.compose([
        Validators.required
      ])],
      last_name: ['', Validators.compose([
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.required
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
          this.storage.set('profile', data.user);
          this.storage.set('token', data.auth_token).then(() =>{
            this.nav.setRoot(HomePage);
          });
        },
        err => {
          console.log(err);
          this.errorMessage = JSON.parse(err._body).errors;
        },
        () => console.log('Register Complete')
      );
    }
  }


}
