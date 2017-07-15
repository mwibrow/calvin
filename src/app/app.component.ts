import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SplashPage } from '../pages/splash/splash';
import { SelectTalkerPage } from '../pages/select-talker/select-talker';
import { HomePage } from '../pages/home/home';
import { IntroductionPage } from '../pages/introduction/introduction';
import { VowelTrainerPage } from '../pages/vowel-trainer/vowel-trainer';
@Component({
  templateUrl: 'app.html'
})
export class CalvinApp {
  rootPage:any = VowelTrainerPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


