import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppData } from '../providers/app-data'
import { WordLists } from '../providers/word-lists'
import { CALVinApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SelectSpeakerPage } from '../pages/select-speaker/select-speaker';
import { WordTrainerPage } from '../pages/word-trainer/word-trainer';
import { VowelGroupModal } from '../pages/vowel-group-modal/vowel-group-modal';

@NgModule({
  declarations: [
    CALVinApp,
    HomePage,
    SelectSpeakerPage,
    WordTrainerPage,
    VowelGroupModal
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
    WordTrainerPage,
    VowelGroupModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppData,
    WordLists
  ]
})
export class AppModule {}
