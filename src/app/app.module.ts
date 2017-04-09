import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SharedData } from '../providers/shared-data'
import { CALVinApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SelectSpeakerPage } from '../pages/select-speaker/select-speaker';
import { WordTrainerPage } from '../pages/word-trainer/word-trainer';

@NgModule({
  declarations: [
    CALVinApp,
    HomePage,
    SelectSpeakerPage,
    WordTrainerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(CALVinApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CALVinApp,
    HomePage,
    SelectSpeakerPage,
    WordTrainerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedData
  ]
})
export class AppModule {}
