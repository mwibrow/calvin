import { NgModule } from '@angular/core';
import { KeywordComponent, KeywordControlsDirective, KeywordUriDirective } from './keyword/keyword';
import { LogoComponent } from './logo/logo';
import { VideoPlayerComponent } from './video-player/video-player';

@NgModule({
	declarations: [KeywordComponent,
    LogoComponent,
    VideoPlayerComponent],
	imports: [],
	exports: [KeywordComponent,
		KeywordControlsDirective,
		KeywordUriDirective,
		LogoComponent,
		VideoPlayerComponent]
})
export class ComponentsModule {}
