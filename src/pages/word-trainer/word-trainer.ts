import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';

import { AppData } from '../../providers/app-data'
import { WordLists } from '../../providers/word-lists'

@Component({
  selector: 'page-word-trainer',
  templateUrl: 'word-trainer.html',
})
export class WordTrainerPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public appData: AppData,
    public wordLists: WordLists) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordTrainer');
  }

  selectVowelGroup() {
    let modal = this.modalCtrl.create(VowelGroupModal,
      { vowelGroupIndex: this.appData.vowelGroupIndex },
      { enableBackdropDismiss: false });
      modal.onDidDismiss(data => {
        if (data.hasOwnProperty('vowelGroupIndex')) {
          this.appData.vowelGroupIndex = data.vowelGroupIndex;
        }
    });
    modal.present();

  }

}

@Component({
  selector: 'vowel-group-modal',
  templateUrl: 'vowel-group.html',
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