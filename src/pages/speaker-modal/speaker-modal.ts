import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AppData } from '../../providers/app-data'

@Component({
  selector: 'page-speaker-modal',
  templateUrl: 'speaker-modal.html',
})
export class SpeakerModal {

  currentSpeaker: string;
  constructor(public navParams: NavParams, public viewCtrl: ViewController,
    public appData: AppData) {
      this.currentSpeaker = appData.speakers[1].id;
  }

  ok() {
    let data = { speakerIndex : this.currentSpeaker };
    this.viewCtrl.dismiss(data);
  }

  cancel() {
    let data = { };
    this.viewCtrl.dismiss(data);
  }
}
