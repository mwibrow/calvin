import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-speaker-modal',
  templateUrl: 'speaker-modal.html',
})
export class SpeakerModal {

  speakerIndex: number;
  speakers: Array<{
    index: number,
    title: string,
    icon: string
  }>;
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.speakerIndex = navParams.data.speakerIndex;
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
    this.speakerIndex = index;
  }

 ok() {
   let data = { speakerIndex : this.speakerIndex };
   this.viewCtrl.dismiss(data);
 }
 cancel() {
   let data = { };
   this.viewCtrl.dismiss(data);
 }


}
