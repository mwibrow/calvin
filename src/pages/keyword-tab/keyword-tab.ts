import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Platform, FabContainer } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';

@Component({
  selector: 'page-keyword-tab',
  templateUrl: 'keyword-tab.html',
})
export class KeywordTab {

  keywordIndex: number;
  @ViewChild('fab') fab: FabContainer
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public wordLists: WordLists,
    public platform: Platform,
    public events: Events
  ) {
    this.keywordIndex = -1;
    this.events.subscribe('VowelGroupChange', () => {
      this.reset();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordTab');
  }

  cycleVowelGroup(direction: number) {
    this.events.publish('VowelGroupChange');
    this.appData.vowelGroupIndex = (this.appData.vowelGroupIndex + direction) % this.wordLists.vowelGroups.length;
    if (this.appData.vowelGroupIndex < 0) {
      this.appData.vowelGroupIndex = this.wordLists.vowelGroups.length - 1;
    }
  }

  reset() {
    this.keywordIndex = -1;
    this.fab.close();
  }

  getButtonsEnabled() {
    return this.keywordIndex >= 0 ? "" : "true";
  }

  changeKeyword(i) {
    this.keywordIndex = i;
  }

  isOutlined(i) {
    return this.keywordIndex != i;
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
    this.appData.speakerIndex = (this.appData.speakerIndex + 1) % this.appData.speakers.length;
  }

}
