import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';
import { SpeakerModal } from '../speaker-modal/speaker-modal';
import { VowelGroupModal } from '../vowel-group-modal/vowel-group-modal';
import { HvdTab } from '../hvd-tab/hvd-tab'
import { KeywordTab } from '../keyword-tab/keyword-tab'

@Component({
  selector: 'page-word-trainer',
  templateUrl: 'word-trainer.html',
})
export class WordTrainerPage {

  hvdTab: any;
  keywordTab: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public appData: AppData,
    public wordLists: WordLists) {

      this.hvdTab = HvdTab;
      this.keywordTab = KeywordTab;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordTrainer');
  }

  selectVowelGroup(fab: any) {
    if (fab) {
      fab.close();
    }
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

  selectSpeaker(fab: any) {
    if (fab) {
      fab.close();
    }
    let modal = this.modalCtrl.create(SpeakerModal,
      {
        currentSpeakerIndex: this.appData.currentSpeakerIndex,
        speakers: this.appData.speakers
      },
      { enableBackdropDismiss: false });
      modal.onDidDismiss(data => {
        if (data.hasOwnProperty('currentSpeakerIndex')) {
          this.appData.currentSpeakerIndex = data.currentSpeakerIndex;
        }
    });
    modal.present();

  }

  cycleSpeaker() {
    this.appData.currentSpeakerIndex = (this.appData.currentSpeakerIndex + 1) % this.appData.speakers.length;
  }

}

