import { NgModule } from '@angular/core';
import { KeywordComponent, KeywordControlsDirective, KeywordUriDirective } from './keyword/keyword';
import { LogoComponent } from './logo/logo';

@NgModule({
	declarations: [KeywordComponent,
    LogoComponent],
	imports: [],
	exports: [KeywordComponent,
		KeywordControlsDirective,
		KeywordUriDirective,
    LogoComponent]
})
export class ComponentsModule {}
