import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { WebAudioPlayer, WebAudioRecorder } from './web-audio';
/*
  Generated class for the AudioProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AudioProvider {

  constructor(public http: Http) {
    console.log('Hello AudioProvider Provider');
  }

  getAudioPlayer() {
    return new WebAudioPlayer();
  }

  getAudioRecorder() {
    return new WebAudioRecorder();
  }

}
