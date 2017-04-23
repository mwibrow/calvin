import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';

import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';
import { SpeakerModal } from '../speaker-modal/speaker-modal';
import { VowelGroupModal } from '../vowel-group-modal/vowel-group-modal';
import { HvdTab } from '../hvd-tab/hvd-tab';
import { KeywordTab } from '../keyword-tab/keyword-tab';
import { KeywordPage } from '../keyword-page/keyword-page';
import { TalkerModePage } from '../talker-mode-page/talker-mode-page';
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
    public alertCtrl: AlertController,
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

  selectSpeaker() {

    let modal = this.modalCtrl.create(SpeakerModal
      ,
      { enableBackdropDismiss: false });
      modal.onDidDismiss(data => {

    });
    modal.present();

  }

  cycleSpeaker() {
    this.appData.speakerIndex = (this.appData.speakerIndex + 1) % this.appData.speakers.length;
  }

  goToKeywords() {
    this.navCtrl.push(KeywordPage);
  }

  selectTalkerMode() {
    //  let modal = this.modalCtrl.create(TalkerModePage
    //   ,
    //   { enableBackdropDismiss: false });
    //   modal.onDidDismiss(data => {

    // });
    // modal.present();
    let alert = this.alertCtrl.create();
    alert.setTitle('Talkers');

    alert.addInput({
      type: 'radio',
      label: 'Single talker',
      value: 'single',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Multiple talkers',
      value: 'multi',
      checked: false
    });

    alert.addButton('Cancel');
    var that: any = this;
    alert.addButton({
      text: 'OK',
      handler: data => {
         that.postSpeakerMode(data);
      }
    });
    alert.present();
  }

  postSpeakerMode(mode) {
    if (mode === 'single') {
      this.selectSpeaker();
    }
  }
}

