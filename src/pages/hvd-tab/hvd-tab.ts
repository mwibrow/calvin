import { Component, ViewChild } from '@angular/core';
import { ModalController, Platform, NavController, NavParams, Events, FabContainer } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';
import { AudioProvider } from 'ionic-audio';
import { VideoPlayerPage } from '../video-player-page/video-player-page';

@Component({
  selector: 'page-hvd-tab',
  templateUrl: 'hvd-tab.html',
})
export class HvdTab {

  keywordIndex: number;
  keyword: string;
  tracks: any[];
  trackMap: any;
  gridRows: any[];
  trackPlaying: boolean;
  @ViewChild('fab') fab: FabContainer
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public wordLists: WordLists,
    public platform: Platform,
    public modalCtrl: ModalController,
    public events: Events,
    private _audioProvider: AudioProvider
  ) {


    this.keywordIndex = -1;
    this.keyword = '';
    this.trackPlaying = false;

    this.gridRows = [];
    this.loadHvds();
    this.makeGrid();
    console.log(platform)
    this.events.subscribe('VowelGroupChange', () => {
      this.reset();
    });

  }

  loadHvds() {
    var i: number;
    var j: number;
    var k: number = 0;
    this.tracks = [];
    this.trackMap = {}
    for (i = 0; i < this.appData.speakers.length; i++) {
      for (j = 0; j < this.wordLists.keywords.length; j++) {
        this.tracks.push({
          src: '../../assets/audio/hvds/' + this.appData.speakers[i].id + '/' + this.wordLists.keywords[j].id + '.wav'
        })
        this.trackMap[this.appData.speakers[i].id + ':' + this.wordLists.keywords[j].id] = k;
        k++;
      }
    }
  }

  cycleVowelGroup(direction: number) {
    this.events.publish('VowelGroupChange');
    this.appData.vowelGroupIndex = (this.appData.vowelGroupIndex + direction) % this.wordLists.vowelGroupIds.length;
    if (this.appData.vowelGroupIndex < 0) {
      this.appData.vowelGroupIndex = this.wordLists.vowelGroupIds.length - 1;
    }
    this.makeGrid();
  }

  makeGrid() {
    var i: number;
    var maxColumns: number;
    var keywords: string[];
    var row: any[];

    if (this.platform.isPortrait()) {
      maxColumns = 1;
    } else {
      maxColumns = 3;
    }
    keywords = this.wordLists.getVowelGroupByIndex(this.appData.vowelGroupIndex).keywords;
    row = [];
    this.gridRows = [];
    for (i = 0; i < keywords.length; i++) {
      row.push({
        display: keywords[i],
        index: i
      })
      if (row.length === maxColumns) {
        this.gridRows.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      this.gridRows.push(row);
    }
    console.log(this.gridRows)
  }

  reset() {
    this.fab.close()
    this.keywordIndex = -1;
  }

  getButtonsEnabled() {
    return this.keywordIndex >= 0 ? '' : 'true';
  }

  changeKeyword(i, keyword) {

    this.keywordIndex = i;
    this.keyword = keyword;
    // use AudioProvider to control selected track
    this.playAudio();
  }


  playAudio() {
    var key: string;
     if (this.keywordIndex  >= 0) {
      key = this.appData.speakers[this.appData.speakerIndex].id + ':' + this.keyword
      this._audioProvider.play(this.trackMap[key]);
    }
  }

  isOutlined(index) {
    return this.keywordIndex != index;
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

  stackVertical() {
    return this.platform.isPortrait();// || this.platform.is('core');
  }

  playVideo() {
    this.navCtrl.push(VideoPlayerPage, { keyword: this.keyword });
    // let modal = this.modalCtrl.create(VideoPlayerPage,
    //   {
    //     keyword: this.keyword
    //   },
    //   { enableBackdropDismiss: false });
    //   modal.onDidDismiss(data => {

    // });
    // modal.present();
  }

}
