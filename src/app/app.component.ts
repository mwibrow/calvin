import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';
import { SelectKeywordGroupPage } from '../pages/select-keyword-group/select-keyword-group';
import { SelectKeywordPage } from '../pages/select-keyword/select-keyword';
import { VowelTrainerPage } from '../pages/vowel-trainer/vowel-trainer';
import { ExampleWordPage } from '../pages/example-word/example-word';
@Component({
  templateUrl: 'app.html'
})
export class CalvinApp {
  rootPage:any = HomePage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
