import { Directive, Input } from '@angular/core';
import { KeywordComponent } from '../../components/keyword/keyword';

@Directive({
  selector: '[keyword-uri]' // Attribute selector
})
export class KeywordUriDirective {
  @Input('keyword-uri') keywordUri: string;
   constructor(public keywordComponent: KeywordComponent) {}

  ngOnInit() {
    this.keywordComponent.uri = this.keywordUri;
  }



}
