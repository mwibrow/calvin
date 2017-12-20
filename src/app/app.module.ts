import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { InlineSVGModule } from 'ng-inline-svg';

import { CalvinApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SelectTalkerPage } from '../pages/select-talker/select-talker';
import { StartPage } from '../pages/start/start';
import { SelectKeywordGroupPage } from '../pages/select-keyword-group/select-keyword-group';
import { SelectKeywordPage } from '../pages/select-keyword/select-keyword';
import { VowelTrainerPage } from '../pages/vowel-trainer/vowel-trainer';
import { ExampleWordPage } from '../pages/example-word/example-word';
import { AudioProvider } from '../providers/audio/audio';
import { AppDataProvider } from '../providers/app-data/app-data';

import { KeywordComponent, KeywordControlsDirective, KeywordUriDirective } from '../components/keyword/keyword';
import { LogoComponent } from '../components/logo/logo';
import { MarkComponent } from '../components/mark/mark';
import { SvgTrapeziumComponent } from '../components/svg-trapezium/svg-trapezium';
import { SvgShapeComponent } from '../components/svg-shape/svg-shape';
import { BackgroundComponent } from '../components/background/background';
import { VideoPlayerComponent } from '../components/video-player/video-player';
import { AnimationFrameRequestProvider } from '../providers/animation-frame-request/animation-frame-request';
import { VocalTractAnimationComponent, AnimationDirective } from '../components/vocal-tract-animation/vocal-tract-animation';


@NgModule({
  declarations: [
    CalvinApp,
    HomePage,
    StartPage,
    VowelTrainerPage,
    ExampleWordPage,
    SelectTalkerPage,
    SelectKeywordGroupPage,
    SelectKeywordPage,
    LogoComponent,
    KeywordComponent,
    KeywordControlsDirective,
    KeywordUriDirective,
    VideoPlayerComponent,
    VocalTractAnimationComponent,
    AnimationDirective,
    SvgTrapeziumComponent,
    SvgShapeComponent,
    BackgroundComponent,
    MarkComponent
  ],
  imports: [
    BrowserModule,
    InlineSVGModule,
    IonicModule.forRoot(CalvinApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CalvinApp,
    HomePage,
    StartPage,
    SelectTalkerPage,
    SelectKeywordGroupPage,
    SelectKeywordPage,
    VowelTrainerPage,
    ExampleWordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AudioProvider,
    AppDataProvider,
    AnimationFrameRequestProvider
  ]
})
export class AppModule {}
