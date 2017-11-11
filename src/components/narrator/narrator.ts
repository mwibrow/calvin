import { Component, ElementRef } from '@angular/core';
import { Events } from 'ionic-angular';
import { AudioProvider, AudioPlayer } from '../../providers/audio/audio';
import { AnimationFrameRequestProvider } from '../../providers/animation-frame-request/animation-frame-request';
/**
 * Generated class for the NarratorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'narrator',
  templateUrl: 'narrator.html'
})
export class NarratorComponent {


  player: AudioPlayer;
  svg: HTMLElement;
  constructor(public elementRef: ElementRef, public audio: AudioProvider,
    public animationFrameRequest: AnimationFrameRequestProvider,
    public events: Events) {
    console.log('Hello NarratorComponent Component');

  }

  svgInserted(e) {
    this.events.publish('svg:narrator-loaded');
    this.setUpMouths();
  }

  setUpMouths() {
    this.svg = this.elementRef.nativeElement.querySelector('svg');

  }
}
