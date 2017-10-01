import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CalvinApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { CalvinLogoComponent } from '../components/calvin-logo/calvin-logo';
@NgModule({
  declarations: [
    CalvinApp,
    HomePage,
    CalvinLogoComponent
  ],
  imports: [
    BrowserModule,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
