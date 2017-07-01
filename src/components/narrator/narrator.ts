import { Component, ElementRef } from '@angular/core';

/**
 * Generated class for the NarratorComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'narrator',
  templateUrl: 'narrator.html'
})
export class NarratorComponent {

  text: string;
  svg: any;
  currentGroupId: string;
  constructor(public elementRef: ElementRef) {
     this.elementRef.nativeElement.querySelector('svg');
     this. currentGroupId = 'medium-rounded';
  }

  ngOnInit() {

  }

  showGroup(id: string) {
     return this.currentGroupId === id;
  }
}
