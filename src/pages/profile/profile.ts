import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Helper } from '../../providers/helper';
import { UserProvider } from '../../providers/user'
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
  errorMessage = '';

  constructor(public nav: NavController, private fb: FormBuilder, private helper: Helper, private userProvider: UserProvider) {
    this.helper.authenticated().then((result) => {
      this.authenticated = true;
      this.helper.getProfile().then( profile => {
         this.profileForm.controls.email.setValue(profile.email);
         this.profileForm.controls.first_name.setValue(profile.first_name);
         this.profileForm.controls.last_name.setValue(profile.last_name);
         this.profileForm.controls.phone.setValue(profile.phone);
       }).catch(console.log);
    }, (error) => {
      this.nav.setRoot('LoginPage');
      // this.nav.push(LoginPage);
    });
  }

  ngOnInit(): any {
    this.profileForm =  this.fb.group({
      first_name: ['', Validators.compose([
        Validators.required,
      ])],
      last_name: ['', Validators.compose([
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
    this.helper.showLoading();
    this.helper.loading.present().then(()=> {
      this.userProvider.profileSubmit(JSON.stringify(this.profileForm.value)).then((data) => {
          this.helper.hideLoading();
          this.helper.setProfile(data);
          this.helper.showMessage('Saved successfully.', 'Success');
          this.errorMessage = null;
        },
        err => {
          this.helper.hideLoading();
          this.errorMessage = err;
        },
        () => console.log('Movie Search Complete')
      );
    });
  }

}
