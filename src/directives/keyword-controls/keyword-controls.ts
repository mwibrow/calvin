import { Directive } from '@angular/core';
import { KeywordComponent } from '../../components/keyword/keyword';

@Directive({
  selector: '[keyword-controls]' // Attribute selector
})
export class KeywordControlsDirective {

  constructor(public keywordComponent: KeywordComponent) {}

  ngOnInit() {
    this.keywordComponent.setControls(true);
  }
}
