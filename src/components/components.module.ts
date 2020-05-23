import { NgModule } from "@angular/core";
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
import {
  VocalTractAnimationComponent,
  AnimationDirective,
} from "./vocal-tract-animation/vocal-tract-animation";

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
  imports: [],
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
})
export class ComponentsModule {}
