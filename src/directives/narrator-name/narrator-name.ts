import { Directive } from '@angular/core';

/**
 * Generated class for the NarratorNameDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[narrator-name]' // Attribute selector
})
export class NarratorNameDirective {

  constructor() {
    console.log('Hello NarratorNameDirective Directive');
  }

}
