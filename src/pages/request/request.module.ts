import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Request } from './request';

@NgModule({
  declarations: [
    Request,
  ],
  imports: [
    IonicPageModule.forChild(Request),
  ],
  exports: [
    Request
  ]
})
export class RequestModule {}
