import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../providers/app-data'

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
    public appData: AppData ) {

    this.setupSpeakers();
  }

  setupSpeakers() {
    var name: string;
    this.slideData = [];
    for(let i = 0; i < this.appData.speakers.length; i++) {
      name = this.appData.speakers[i].name.replace(/\b\w/g, l => l.toUpperCase());
      this.slideData.push({
        title: name,
        index: i,
        icon: this.appData.speakers[i].avatarImageSrc
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectSpeaker');
  }

  selectSpeaker(index: number) {
    this.appData.currentSpeakerIndex = index;
  }

}
