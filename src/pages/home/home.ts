import { Component, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioProvider } from '../../providers/audio/audio';

const remote = window['require']('electron').remote;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)',
    '(document:keyup)': 'handleKeyboardEvents($event)'
  }
})
export class HomePage {

  audioAvailable: boolean;
  constructor(
    private audio: AudioProvider,
    public navCtrl: NavController) {
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

  handleKeyboardEvents(event) {
    let key = event.key || event.keyCode;
    console.log(event)
    switch (event.type) {
      case 'keydown':
        switch (key) {
          case 'F11':
          console.log(remote.getCurrentWindow())
            let currentWindow = remote.getCurrentWindow();
            if (currentWindow.isMaximized()) {
              currentWindow.unmaximize();
            } else {
              currentWindow.maximize();
            }
        }
    }
  }


}
