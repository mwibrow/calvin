import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { InlineSVGModule } from 'ng-inline-svg';

import { CalvinApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VowelTrainerPage } from '../pages/vowel-trainer/vowel-trainer';
import { KeywordTrainerPage } from '../pages/keyword-trainer/keyword-trainer';
import { SelectTalkerPage } from '../pages/select-talker/select-talker';
import { AudioProvider } from '../providers/audio/audio';
import { AppDataProvider } from '../providers/app-data/app-data';

@NgModule({
  declarations: [
    CalvinApp,
    HomePage,
    VowelTrainerPage,
    KeywordTrainerPage
  ],
  imports: [
    BrowserModule,
    InlineSVGModule,
    IonicModule.forRoot(CalvinApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CalvinApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AudioProvider,
    AppDataProvider
  ]
})
export class AppModule {}
