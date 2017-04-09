import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SharedData } from '../../providers/shared-data'

@Component({
  selector: 'page-select-speaker',
  templateUrl: 'select-speaker.html',
})
export class SelectSpeakerPage {



  slideData: Array<{title: string, index: number, icon: string}>;
  mySlideOptions = {
    pager: true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sharedData: SharedData ) {

    this.setupSpeakers();
  }

  setupSpeakers() {
    var name: string;
    this.slideData = [];
    for(let i = 0; i < this.sharedData.speakers.length; i++) {
      name = this.sharedData.speakers[i].name.replace(/\b\w/g, l => l.toUpperCase());
      this.slideData.push({
        title: name,
        index: i,
        icon: this.sharedData.speakers[i].avatarImageSrc
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectSpeaker');
  }

  selectSpeaker(index: number) {
    this.sharedData.currentSpeakerIndex = index;
  }

}
