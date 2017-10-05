import { Component, HostListener } from '@angular/core';
import { NavController, App, ModalController, AlertController } from 'ionic-angular';
import { SelectTalkerPage } from '../select-talker/select-talker';
import { AudioProvider } from '../../providers/audio/audio';

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
  constructor(
    private audio: AudioProvider,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private app: App) {
  }

  ngOnInit() {
    this.audioAvailable = true;
    this.checkAudio();
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

  onVowelTrainer() {
    console.log('V')
    this.showSelectTalkerModal()
  }

  showSelectTalkerModal() {
    const profileModal = this.modalCtrl.create(SelectTalkerPage);
    profileModal.present();
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

