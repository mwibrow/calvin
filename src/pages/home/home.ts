import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioProvider } from '../../providers/audio/audio';

const remote = window['require']('electron').remote;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  audioAvailable: boolean;
  constructor(
    private audio: AudioProvider,
    public navCtrl: NavController) {
    window.addEventListener('keyup',(e) => console.log(e), true)
  }

  ngOnInit() {
    this.audioAvailable = true;
    this.checkAudio();
  }

  checkAudio() {
    this.audio.recorder.initialise()
      .then((stream) => {})
      .catch((err) => {
        this.audioAvailable = false;
      });
  }

  exitApplication() {
    remote.getCurrentWindow().close();
  }


}
