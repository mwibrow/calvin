import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-speaker-modal',
  templateUrl: 'speaker-modal.html',
})
export class SpeakerModal {

  currentSpeakerIndex: number;
  speakers: Array<{
    index: number,
    title: string,
    icon: string
  }>;
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.currentSpeakerIndex = navParams.data.currentSpeakerIndex;
    var i: number;
    this.speakers = [];
    for (i = 0; i < navParams.data.speakers.length; i++) {
      this.speakers.push({
        index: i,
        title: navParams.data.speakers[i].name,
        icon: navParams.data.speakers[i].avatarImageSrc
      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakerModal');
  }

setSpeaker(index: number) {
    this.currentSpeakerIndex = index;
  }

 ok() {
   let data = { currentSpeakerIndex : this.currentSpeakerIndex };
   this.viewCtrl.dismiss(data);
 }
 cancel() {
   let data = { };
   this.viewCtrl.dismiss(data);
 }


}
