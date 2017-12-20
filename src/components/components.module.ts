import { NgModule } from '@angular/core';
import { KeywordComponent, KeywordControlsDirective, KeywordUriDirective } from './keyword/keyword';
import { LogoComponent } from './logo/logo';
import { VideoPlayerComponent } from './video-player/video-player';
import { VocalTractAnimationComponent } from './vocal-tract-animation/vocal-tract-animation';
import { HelpComponent } from './help/help';
import { SvgTrapeziumComponent } from './svg-trapezium/svg-trapezium';
import { BackgroundComponent } from './background/background';
import { SvgShapeComponent } from './svg-shape/svg-shape';
import { MarkComponent } from './mark/mark';

@NgModule({
	declarations: [KeywordComponent,
		LogoComponent,
		VideoPlayerComponent,
		VocalTractAnimationComponent,
    HelpComponent,
    SvgTrapeziumComponent,
    BackgroundComponent,
    SvgShapeComponent,
    MarkComponent],
	imports: [],
	exports: [KeywordComponent,
		KeywordControlsDirective,
		KeywordUriDirective,
		LogoComponent,
		VideoPlayerComponent,
    	VocalTractAnimationComponent,
    HelpComponent,
    SvgTrapeziumComponent,
    BackgroundComponent,
    SvgShapeComponent,
    MarkComponent]
})
export class ComponentsModule {}
