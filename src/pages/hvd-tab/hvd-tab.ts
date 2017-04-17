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
  tracks: any[];
  trackMap: any;
  gridRows: any[];

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
    // for (j = 0; j < this.wordLists.hvds.length; j++) {
    //   this.tracks.push({
    //     src: '../../assets/audio/hvds/mark/' + this.wordLists.hvds[j].id + '.wav'
    //   })
    //   this.trackMap[this.wordLists.hvds[j].id] = j;
    // }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HvdTab');

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
    var keywords: string[];
    var row: any[];
    keywords = this.wordLists.getVowelGroupByIndex(this.appData.vowelGroupIndex).keywords;
    row = [];
    this.gridRows = [];
    for (i = 0; i < keywords.length; i++) {
      row.push({
        display: keywords[i],
        index: i
      })
      if (row.length === 3) {
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
    this.hvdIndex = -1;
  }

  getButtonsEnabled() {
    return this.hvdIndex >= 0 ? '' : 'true';
  }

  changeHvd(i, hvd) {
    var key: string;
    this.hvdIndex = i;
    // use AudioProvider to control selected track
    if (hvd) {
      key = this.appData.speakers[this.appData.speakerIndex].id + ':' + hvd
      this._audioProvider.play(this.trackMap[key]);
    }
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
    this.appData.speakerIndex = (this.appData.speakerIndex + 1) % this.appData.speakers.length;
  }

  stackVertical() {
    return this.platform.isPortrait();// || this.platform.is('core');
  }


}
