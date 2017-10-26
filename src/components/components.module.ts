import { NgModule } from '@angular/core';
import { KeywordComponent, KeywordControlsDirective, KeywordUriDirective } from './keyword/keyword';
import { LogoComponent } from './logo/logo';
import { VideoPlayerComponent } from './video-player/video-player';
import { VocalTractAnimationComponent } from './vocal-tract-animation/vocal-tract-animation';
import { HelpComponent } from './help/help';
import { TrapeziumComponent } from './trapezium/trapezium';

@NgModule({
	declarations: [KeywordComponent,
		LogoComponent,
		VideoPlayerComponent,
		VocalTractAnimationComponent,
    HelpComponent,
    TrapeziumComponent],
	imports: [],
	exports: [KeywordComponent,
		KeywordControlsDirective,
		KeywordUriDirective,
		LogoComponent,
		VideoPlayerComponent,
    	VocalTractAnimationComponent,
    HelpComponent,
    TrapeziumComponent]
})
export class ComponentsModule {}
