import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, Events, FabContainer } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';
import { AudioProvider } from 'ionic-audio';

@Component({
  selector: 'page-hvd-tab',
  templateUrl: 'hvd-tab.html',
})
export class HvdTab {

  hvdIndex: number;
  @ViewChild('fab') fab: FabContainer
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public wordLists: WordLists,
    public platform: Platform,
    public events: Events,
    private _audioProvider: AudioProvider
  ) {
    this.hvdIndex = -1;

    console.log(platform)
    this.events.subscribe('VowelGroupChange', () => {
      this.reset();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HvdTab');

  }

  cycleVowelGroup(direction: number) {
    this.events.publish('VowelGroupChange');
    this.appData.vowelGroupIndex = (this.appData.vowelGroupIndex + direction) % this.wordLists.vowelGroups.length;
    if (this.appData.vowelGroupIndex < 0) {
      this.appData.vowelGroupIndex = this.wordLists.vowelGroups.length - 1;
    }
  }

  reset() {
    this.fab.close()
    this.hvdIndex = -1;
  }

  getButtonsEnabled() {
    return this.hvdIndex >= 0 ? '' : 'true';
  }

  changeHvd(i) {
    this.hvdIndex = i;
  }

  isOutlined(i) {
    return this.hvdIndex != i;
  }

  getFablistOrientation() {
    if (this.isLandscape()) {
      return 'left';
    } else {
      return 'top';
    }
  }

  getSouthWestIcon() {
     if (this.isLandscape()) {
      return 'arrow-dropleft';
    } else {
      return 'arrow-dropup';
    }
  }

  isLandscape() {
    return true; //this.platform.isLandscape();
  }

  cycleSpeaker() {
    this.appData.currentSpeakerIndex = (this.appData.currentSpeakerIndex + 1) % this.appData.speakers.length;
  }

  stackVertical() {
    return this.platform.isPortrait();// || this.platform.is('core');
  }

}
