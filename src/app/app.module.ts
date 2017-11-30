import { AuthService } from './../providers/auth-service';
import { Helper } from '../providers/helper';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
// import { RegisterModule } from '../pages/register/register.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from "@ionic/Storage";
import { ReactiveFormsModule } from '@angular/forms';
import {EnvModule} from "./env/env.module";
import { RequestsProvider } from '../providers/requests';
import { UserProvider } from '../providers/user';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '811cf005'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    // RegisterModule,
    ReactiveFormsModule,
    CloudModule.forRoot(cloudSettings),
    EnvModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Helper,
    RequestsProvider,
    UserProvider
  ]
})
export class AppModule {}
