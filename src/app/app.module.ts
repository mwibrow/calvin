import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IntroductionPage } from '../pages/introduction/introduction';
import { AudioIOComponent } from '../components/audio-io/audio-io';
import { SvgImageComponent } from '../components/svg-image/svg-image';
import { SvgSrcDirective } from '../directives/svg-src/svg-src';
import { VocalTractAnimationComponent } from '../components/vocal-tract-animation/vocal-tract-animation';
import { AppStateProvider } from '../providers/app-state/app-state';
import { AppDataProvider } from '../providers/app-data/app-data';
import { LogoComponent } from '../components/logo/logo';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroductionPage,
    AudioIOComponent,
    SvgImageComponent,
    SvgSrcDirective,
    VocalTractAnimationComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroductionPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppStateProvider,
    AppDataProvider,
    HttpModule
  ]
})
export class AppModule {}
