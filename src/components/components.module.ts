import { NgModule } from '@angular/core';
import { KeywordComponent, KeywordControlsDirective, KeywordUriDirective } from './keyword/keyword';
import { LogoComponent } from './logo/logo';
import { VideoPlayerComponent } from './video-player/video-player';
import { VocalTractAnimationComponent } from './vocal-tract-animation/vocal-tract-animation';
import { HelpComponent } from './help/help';
import { SvgTrapeziumComponent } from './svg-trapezium/svg-trapezium';
import { SvgArrowComponent } from './svg-arrow/svg-arrow';

@NgModule({
	declarations: [KeywordComponent,
		LogoComponent,
		VideoPlayerComponent,
		VocalTractAnimationComponent,
    HelpComponent,
    SvgTrapeziumComponent,
    SvgArrowComponent],
	imports: [],
	exports: [KeywordComponent,
		KeywordControlsDirective,
		KeywordUriDirective,
		LogoComponent,
		VideoPlayerComponent,
    	VocalTractAnimationComponent,
    HelpComponent,
    SvgTrapeziumComponent,
    SvgArrowComponent]
})
export class ComponentsModule {}
