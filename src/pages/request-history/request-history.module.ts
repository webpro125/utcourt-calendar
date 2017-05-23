import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestHistoryPage } from './request-history';

@NgModule({
  declarations: [
    RequestHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestHistoryPage),
  ],
  exports: [
    RequestHistoryPage
  ]
})
export class RequestHistoryPageModule {}
