import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';
import { ExamplePage } from '../example-page/example-page';

@IonicPage()
@Component({
  selector: 'page-keyword-page',
  templateUrl: 'keyword-page.html',
})
export class KeywordPage {

  private keywordIndex: number;
  private keywords: string[];
  private gridRows: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public appData: AppData,
    public wordLists: WordLists) {

    this.keywordIndex = -1;
    this.keywords = [];
    this.makeKeywordGrid();
  }

  makeKeywordGrid() {
    var i: number;
    var maxColumns: number;
    var row: any[];

    if (this.platform.isPortrait()) {
      maxColumns = 1;
    } else {
      maxColumns = 3;
    }
    this.keywords = this.wordLists.getVowelGroupByIndex(this.appData.vowelGroupIndex).keywords;
    row = [];
    this.gridRows = [];
    for (i = 0; i < this.keywords.length; i++) {
      row.push({
        display: this.keywords[i],
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
  }

  isEnabled(index) {
    return this.keywordIndex >= 0;
  }
  isOutlined(index) {
    return this.keywordIndex != index;
  }

  cycleVowelGroup(direction: number) {
    this.appData.vowelGroupIndex = (this.appData.vowelGroupIndex + direction) % this.wordLists.vowelGroupIds.length;
    if (this.appData.vowelGroupIndex < 0) {
      this.appData.vowelGroupIndex = this.wordLists.vowelGroupIds.length - 1;
    }
    this.makeKeywordGrid();
  }

  cycleSpeaker() {
    this.appData.speakerIndex = (this.appData.speakerIndex + 1) % this.appData.speakers.length;
  }

  showExamplePage() {
    this.navCtrl.push(ExamplePage, {
      keyword: this.keywords[this.keywordIndex] });
  }

  changeKeyword(i, keyword) {

    this.keywordIndex = i;

  }

  hasExamples(index) {
    var examples = this.wordLists.getExamples(this.appData.vowelGroupIndex, this.keywords[this.keywordIndex]);
    return examples.length > 0;
  }

}
