import { NgModule } from '@angular/core';
import { KeywordComponent, KeywordControlsDirective, KeywordUriDirective } from './keyword/keyword';
import { LogoComponent } from './logo/logo';
import { VideoPlayerComponent } from './video-player/video-player';
import { VocalTractAnimationComponent } from './vocal-tract-animation/vocal-tract-animation';

@NgModule({
	declarations: [KeywordComponent,
		LogoComponent,
		VideoPlayerComponent,
		VocalTractAnimationComponent],
	imports: [],
	exports: [KeywordComponent,
		KeywordControlsDirective,
		KeywordUriDirective,
		LogoComponent,
		VideoPlayerComponent,
    	VocalTractAnimationComponent]
})
export class ComponentsModule {}
