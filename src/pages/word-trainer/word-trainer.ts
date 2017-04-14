import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';

import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';
import { VowelGroupModal } from '../vowel-group-modal/vowel-group-modal';
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

