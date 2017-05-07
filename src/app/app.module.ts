import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicAudioModule } from 'ionic-audio';

import { IonicStorageModule } from '@ionic/storage';

import { AppData } from '../providers/app-data';
import { WordLists } from '../providers/word-lists';
import { WebRecorder } from '../providers/web-recorder'
import { CALVinApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SelectSpeakerPage } from '../pages/select-speaker/select-speaker';
import { WordTrainerPage } from '../pages/word-trainer/word-trainer';
import { VowelGroupModal } from '../pages/vowel-group-modal/vowel-group-modal';
import { SpeakerModal } from '../pages/speaker-modal/speaker-modal';
import { HvdTab } from '../pages/hvd-tab/hvd-tab';
import { KeywordTab } from '../pages/keyword-tab/keyword-tab';
import { VideoPlayerPage } from '../pages/video-player-page/video-player-page';

import { KeywordPage } from '../pages/keyword-page/keyword-page';
import { ExamplePage } from '../pages/example-page/example-page';
import { TalkerModePage } from '../pages/talker-mode-page/talker-mode-page';
import { Introduction } from '../pages/introduction/introduction';
import { Svg } from '../providers/svg';

import { SafePipe } from '../pipes/safe-pipe';

import { Calvin } from '../components/calvin/calvin';
import { CalvinWave } from '../components/calvin/calvin-wave';
import { CalvinCheer } from '../components/calvin/calvin-cheer';
import { CalvinProfile } from '../components/calvin/calvin-profile';
import { CalvinVocalTract } from '../components/calvin/calvin-vocal-tract';

import { HttpModule } from '@angular/http';

import { SvgSrc } from '../components/svg-src/svg-src';
import { SvgImage } from '../components/svg-image/svg-image';
import { AudioIO } from '../components/audio-io/audio-io';
import { VocalTractAnimation } from '../components/vocal-tract-animation/vocal-tract-animation';
@NgModule({
  declarations: [
    CALVinApp,
    HomePage,
    SelectSpeakerPage,
    WordTrainerPage,
    SpeakerModal,
    VowelGroupModal,
    HvdTab,
    KeywordTab,
    VideoPlayerPage,
    KeywordPage,
    ExamplePage,
    TalkerModePage,
    Introduction,
    SafePipe,
    Calvin, CalvinWave, CalvinCheer, CalvinProfile, CalvinVocalTract,
    SvgSrc,SvgImage, AudioIO,
    VocalTractAnimation
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(CALVinApp),
    IonicAudioModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CALVinApp,
    HomePage,
    SelectSpeakerPage,
    WordTrainerPage,
    SpeakerModal,
    VowelGroupModal,
    HvdTab,
    KeywordTab,
    VideoPlayerPage,
    KeywordPage,
    ExamplePage,
    TalkerModePage,
    Introduction
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppData,
    WordLists,
    WebRecorder,
    Svg
  ]
})
export class AppModule {}
