import { Component, HostListener } from '@angular/core';
import { NavController, App, ModalController, AlertController } from 'ionic-angular';
import { SelectTalkerPage } from '../select-talker/select-talker';
import { SelectKeywordGroupPage } from '../select-keyword-group/select-keyword-group';
import { AudioProvider } from '../../providers/audio/audio';
import { AppDataProvider } from '../../providers/app-data/app-data';

import * as mdColors from 'material-colors';

let _remote = null
try {
  _remote = window['require']('electron').remote;
} catch (err) {
  console.debug('No electron remote detected');
}

const remote = _remote;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)',
    '(document:keyup)': 'handleKeyboardEvents($event)'
  }
})
export class HomePage {

  audioAvailable: boolean;
  remote: any;
  constructor(
    private audio: AudioProvider,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public appData: AppDataProvider,
    private app: App) {
      this.remote = remote;
  }

  ngOnInit() {
    this.audioAvailable = true;
    this.checkAudio();
    console.log(this.appData);
  }

  ionViewDidEnter() {
    this.app.setTitle('CALVin');
  }

  checkAudio() {
    this.audio.recorder.initialise()
      .then((stream) => {})
      .catch((err) => {
        this.audioAvailable = false;
      });
  }

  exitApplication() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to quit <div class="calvin-logo"><span>C</span><span>A</span><span>L</span><span>V</span><span>in</span></div>&nbsp;?',
      subTitle: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => remote && remote.getCurrentWindow().close()
        }],
      cssClass: 'alert'
    });
    alert.present();
  }

  onStart() {
    this.showSelectTalkerModal(SelectKeywordGroupPage);
  }

  showSelectTalkerModal(nextPage: any) {
    const selectTalkerModal = this.modalCtrl.create(SelectTalkerPage);
    selectTalkerModal.onDidDismiss(data => {
      if (data) {
        this.navCtrl.push(nextPage);
      }
    });
    selectTalkerModal.present();
  }

  handleKeyboardEvents(event) {
    let key = event.key || event.keyCode;
    console.log(event)
    switch (event.type) {
      case 'keydown':
        switch (key) {
          case 'F11':
          console.log(remote.getCurrentWindow())
            let currentWindow = remote.getCurrentWindow();
            if (currentWindow.isMaximized()) {
              currentWindow.unmaximize();
            } else {
              currentWindow.maximize();
            }
        }
    }
  }


}

