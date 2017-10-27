import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { VowelTrainerPage } from '../pages/vowel-trainer/vowel-trainer';
import { ExampleWordPage } from '../pages/example-word/example-word';
@Component({
  templateUrl: 'app.html'
})
export class CalvinApp {
<<<<<<< HEAD
  rootPage:any = HomePage;
=======
  rootPage:any = ExampleWordPage;
>>>>>>> afba3baf9ff6fe271df91acaf6b1ce5858c6bfcf

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

