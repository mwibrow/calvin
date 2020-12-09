import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg";
import { IonicModule } from "ionic-angular";

import {
  KeywordComponent,
  KeywordControlsDirective,
  KeywordUriDirective,
} from "./keyword/keyword";

import { BackgroundComponent } from "./background/background";
import { MarkComponent } from "./mark/mark";
import { HelpComponent } from "./help/help";
import { SvgShapeComponent } from "./svg-shape/svg-shape"; 
import { LogoComponent } from "./logo/logo";
import { VideoPlayerComponent } from "./video-player/video-player";
import { SvgTrapeziumComponent } from "./svg-trapezium/svg-trapezium";
import { VocalTractAnimationComponent } from "./vocal-tract-animation/vocal-tract-animation";
import { AnimationDirective } from "./vocal-tract-animation/animation-directive";
import { HeadingComponent } from "./heading/heading";
import { FancyFrameComponent } from "./fancy-frame/fancy-frame";

@NgModule({
  declarations: [
    KeywordComponent,
    KeywordControlsDirective,
    KeywordUriDirective,
    LogoComponent,
    VideoPlayerComponent,
    VocalTractAnimationComponent,
    AnimationDirective,
    HelpComponent,
    SvgTrapeziumComponent,
    BackgroundComponent,
    SvgShapeComponent,
    MarkComponent,
    HeadingComponent,
    FancyFrameComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    IonicModule.forRoot(KeywordComponent),
  ],
  exports: [
    KeywordComponent,
    KeywordControlsDirective,
    KeywordUriDirective,
    LogoComponent,
    VideoPlayerComponent,
    VocalTractAnimationComponent,
    AnimationDirective,
    HelpComponent,
    SvgTrapeziumComponent,
    BackgroundComponent,
    SvgShapeComponent,
    MarkComponent,
    HeadingComponent,
    FancyFrameComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
