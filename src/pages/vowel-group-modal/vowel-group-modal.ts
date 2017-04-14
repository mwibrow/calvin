import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { WordLists } from '../../providers/word-lists';

@Component({
  selector: 'vowel-group-modal',
  templateUrl: 'vowel-group-modal.html',
})
export class VowelGroupModal {

  vowelGroups: Array<{
    index: number,
    title: string,
    hvds: string
  }>;
  vowelGroupIndex: number;
  constructor(
    public viewCtrl: ViewController,
    public wordLists: WordLists,
    public navParams:NavParams
  ) {
    this.vowelGroupIndex = navParams.data.vowelGroupIndex;
    var i: number;
    this.vowelGroups = [];
    for (i = 0; i < wordLists.vowelGroups.length; i++) {
      this.vowelGroups.push({
        index: i,
        title: wordLists.vowelGroups[i].title,
        hvds: wordLists.vowelGroups[i].hvds.join(' ')
      })
    }
  }

  setVowelGroup(index) {
    this.vowelGroupIndex = index;
  }

 ok() {
   let data = { vowelGroupIndex : this.vowelGroupIndex };
   this.viewCtrl.dismiss(data);
 }
 cancel() {
   let data = { };
   this.viewCtrl.dismiss(data);
 }

}