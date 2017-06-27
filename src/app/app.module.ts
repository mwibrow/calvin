import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { SelectTalkerPage } from '../pages/select-talker/select-talker';
import { IntroductionPage } from '../pages/introduction/introduction';
import { VowelTrainerPage } from '../pages/vowel-trainer/vowel-trainer';

import { TalkerModeModal } from '../pages/talker-mode-modal/talker-mode-modal';

import { AudioIOComponent } from '../components/audio-io/audio-io';
import { SvgImageComponent } from '../components/svg-image/svg-image';
import { SvgSrcDirective } from '../directives/svg-src/svg-src';
import { VocalTractAnimationComponent } from '../components/vocal-tract-animation/vocal-tract-animation';
import { AppStateProvider } from '../providers/app-state/app-state';
import { AppDataProvider } from '../providers/app-data/app-data';
import { LogoComponent } from '../components/logo/logo';

import { HttpModule } from '@angular/http';
import { AnimationDirective } from '../directives/animation/animation';
import { VideoPlayerComponent } from '../components/video-player/video-player';
import { VideoDirective } from '../directives/video/video';
import { AudioProvider } from '../providers/audio/audio';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroductionPage,
    VowelTrainerPage,
    SplashPage,
    SelectTalkerPage,
    AudioIOComponent,
    SvgImageComponent,
    SvgSrcDirective,
    VocalTractAnimationComponent,
    LogoComponent,
    AnimationDirective,
    VideoPlayerComponent,
    VideoDirective,
    TalkerModeModal
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
    VowelTrainerPage,
    SplashPage,
    SelectTalkerPage,
    TalkerModeModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppStateProvider,
    AppDataProvider,
    HttpModule,
    AudioProvider
  ]
})
export class AppModule {}
