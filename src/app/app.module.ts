import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CalvinApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExitAppPage } from '../pages/exit-app/exit-app';
import { CalvinLogoComponent } from '../components/calvin-logo/calvin-logo';
import { AudioProvider } from '../providers/audio/audio';
import { AppDataProvider } from '../providers/app-data/app-data';

@NgModule({
  declarations: [
    CalvinApp,
    HomePage,
    CalvinLogoComponent,
    ExitAppPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(CalvinApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CalvinApp,
    HomePage,
    ExitAppPage
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
