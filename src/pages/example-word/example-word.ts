import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppDataProvider, Word } from '../../providers/app-data/app-data';
/**
 * Generated class for the ExampleWordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-example-word',
  templateUrl: 'example-word.html',
})
export class ExampleWordPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExampleWordPage');
  }

  getExampleWord(): string {
    let word: Word = this.getWord();
    console.log(word)
    return `<span class="keyword-display">${word.display}</span>`;
  }

  getWord(): Word {
    let word: Word = this.appData.getExampleWord();
    if (word === undefined) {
      console.error(`No entry for keyword ${word.id}`);
    }
    return word;
  }

  getAudioUri(): string {
    let talker = this.appData.getTalker();
    let word = this.appData.getExampleWord();
    console.log(talker, word)
    return this.appData.getAudio(talker.id, word.id, 'example');
  }

}
