import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicAudioModule } from 'ionic-audio';

import { AppData } from '../providers/app-data'
import { WordLists } from '../providers/word-lists'
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
    ExamplePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(CALVinApp),
    IonicAudioModule.forRoot()
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
    ExamplePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppData,
    WordLists
  ]
})
export class AppModule {}
