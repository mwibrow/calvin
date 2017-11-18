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


class Narration {

  narratives: Narrative[];
  index: number;
  continue: Boolean;

  constructor() {
    this.narratives = new Array<Narrative>();
    this.index = 0;
    this.continue = false;
  }

  narrate() {
    this.index = 0;
    this.continue = true;
    this._narrate();
  }

  private async _narrate() {
    if (this.index >= this.narratives.length) return;
    await this.narratives[this.index].narrate();
    if (this.continue) {
      this.index ++;
      this._narrate();
    }
  }

}

class Narrative {

  player: AudioPlayer;
  audioUrl: string;
  onStart: Function;
  onStop: Function;

  async narrate() {
    this.onStart && this.onStart();
    try {
      await this.player.playUrl(this.audioUrl);
    } catch (err) {

    } finally {
      this.onStop && this.onStop();
    }
  }

  stop() {
    this.player.stop();
  }
}
