import { Directive } from '@angular/core';
import { NarratorComponent } from '../../components/narrator/narrator';

@Directive({
  selector: '[narrator-inset]' // Attribute selector
})
export class NarratorInsetDirective {

  constructor(public narratorComponent: NarratorComponent) {
  }

  ngOnInit() {
    this.narratorComponent.inset = true;
  }

}
