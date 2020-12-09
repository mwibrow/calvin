import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

// import { HomePage } from "../pages/home/home";
import { SelectTalkerPage } from "../pages/select-talker/select-talker";
@Component({
  templateUrl: "app.html",
})
export class CalvinApp {
  rootPage: any = SelectTalkerPage; // HomePage;
  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
