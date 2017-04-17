import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppData } from '../providers/app-data';

import { HomePage } from '../pages/home/home';
import { WordTrainerPage } from '../pages/word-trainer/word-trainer';
import { VideoPlayerPage } from '../pages/video-player-page/video-player-page';

@Component({
  templateUrl: 'app.html',
  providers: [AppData]
})
export class CALVinApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
      public platform: Platform,
      public menu: MenuController,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public appData: AppData) {
    this.initialiseApp();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Vowel trainer', component: WordTrainerPage },
      { title: 'Video', component: VideoPlayerPage }
    ];
  }

  initialiseApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

