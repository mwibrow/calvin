import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SharedData } from '../providers/shared-data';

import { HomePage } from '../pages/home/home';
import { SelectSpeakerPage } from '../pages/select-speaker/select-speaker';
import { WordTrainerPage } from '../pages/word-trainer/word-trainer';


@Component({
  templateUrl: 'app.html',
  providers: [SharedData]
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
      public sharedData: SharedData) {
    this.initialiseApp();
    this.pages = [
      { title: 'CALVin', component: HomePage },
      { title: 'Select speaker', component: SelectSpeakerPage },
      { title: 'Word trainer', component: WordTrainerPage }
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

