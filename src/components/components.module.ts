import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InlineSVGModule } from "ng-inline-svg";

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
  ],
  imports: [CommonModule, InlineSVGModule],
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
