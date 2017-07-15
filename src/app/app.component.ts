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
export class MyApp {
  rootPage:any = VowelTrainerPage;
  animation: Animation;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.animation = Animation.getInstance();
      this.animation.start();
    });
  }
}


class Animation {

  private static instance: Animation = new Animation();
  private callbacks: any;
  private running: boolean;

  private constructor() {
    this.callbacks = {};
    this.running = false;
  }

  public static getInstance() {
    return Animation.instance;
  }

  public isRunning() {
    return this.running;
  }

  public addCallback(callback:any, name:string) {
    this.callbacks[name] = callback;
  }

  public deleteCallback(name:string) {
     if (this.callbacks.hasOwnProperty(name)) {
        delete this.callbacks[name];
      }
  }

  private doCallbacks(me: Animation, timestamp: any) {
    let name: string;
    for (name in this.callbacks) {
      if (this.callbacks.hasOwnProperty(name)) {
        this.callbacks[name](this, timestamp);
      }
    }
    if (me.running) {
      window.requestAnimationFrame((timestamp) => me.doCallbacks(me, timestamp));
    }
  }

  public start() {
    this.running = true;
    window.requestAnimationFrame((timestamp) => this.doCallbacks(this, timestamp));
  }

  public stop() {
    this.running = false;
  }
}
