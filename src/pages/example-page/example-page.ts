import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';


@IonicPage()
@Component({
  selector: 'page-example-page',
  templateUrl: 'example-page.html',
})
export class ExamplePage {

  private exampleIndex: number;
  private examples: string[];
  private gridRows: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public appData: AppData,
    public wordLists: WordLists) {

      this.exampleIndex = -1;
      this.examples = this.wordLists.vowelGroups[this.wordLists.vowelGroupIds[this.appData.vowelGroupIndex]].examples[navParams.data.keyword];
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

    row = [];
    this.gridRows = [];
    for (i = 0; i < this.examples.length; i++) {
      row.push({
        display: this.examples[i],
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

  isEnabled() {
    return this.exampleIndex >= 0;
  }

  isOutlined(index) {
    return this.exampleIndex != index;
  }

  goToPreviousPage() {
    this.navCtrl.pop();
  }

  changeExample(i, keyword) {

    this.exampleIndex = i;

  }

}
