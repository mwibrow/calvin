import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { InlineSVGModule } from "ng-inline-svg";

import { CalvinApp } from "./app.component";

import { ExampleWordPage } from "../pages/example-word/example-word";
import { ExampleWordPageModule } from "../pages/example-word/example-word.module";
import { HomePage } from "../pages/home/home";
import { HomePageModule } from "../pages/home/home.module";
import { SelectKeywordGroupPage } from "../pages/select-keyword-group/select-keyword-group";
import { SelectKeywordGroupPageModule } from "../pages/select-keyword-group/select-keyword-group.module";
import { SelectKeywordPage } from "../pages/select-keyword/select-keyword";
import { SelectKeywordPageModule } from "../pages/select-keyword/select-keyword.module";
import { SelectTalkerPage } from "../pages/select-talker/select-talker";
import { SelectTalkerPageModule } from "../pages/select-talker/select-talker.module";
import { VowelTrainerPage } from "../pages/vowel-trainer/vowel-trainer";
import { VowelTrainerPageModule } from "../pages/vowel-trainer/vowel-trainer.module";

import { AnimationFrameRequestProvider } from "../providers/animation-frame-request/animation-frame-request";
import { AppDataProvider } from "../providers/app-data/app-data";
import { AudioProvider } from "../providers/audio/audio";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [
    CalvinApp,
    // HomePage,
    // VowelTrainerPage,
    // ExampleWordPage,
    // SelectTalkerPage,
    // SelectKeywordGroupPage,
    // SelectKeywordPage,
  ],
  imports: [
    BrowserModule,
    InlineSVGModule,
    IonicModule.forRoot(CalvinApp),
    ComponentsModule,
    HomePageModule,
    SelectTalkerPageModule,
    SelectKeywordGroupPageModule,
    SelectKeywordPageModule,
    ExampleWordPageModule,
    VowelTrainerPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CalvinApp,
    HomePage,
    SelectTalkerPage,
    SelectKeywordGroupPage,
    SelectKeywordPage,
    VowelTrainerPage,
    ExampleWordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AudioProvider,
    AppDataProvider,
    AnimationFrameRequestProvider,
  ],
})
export class AppModule {}
