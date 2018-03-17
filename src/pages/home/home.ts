import { Component, HostListener } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { SelectTalkerPage } from '../select-talker/select-talker';
import { AudioProvider } from '../../providers/audio/audio';
import { AppDataProvider } from '../../providers/app-data/app-data';


let _remote = null
try {
  _remote = window['require']('electron').remote;
} catch (err) {
  console.debug('No electron remote detected');
}

const remote = _remote;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  audioAvailable: boolean;
  remote: any;
  constructor(
    private audio: AudioProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public appData: AppDataProvider,
    private app: App) {
      this.remote = remote;
  }

  ngOnInit() {
    this.audioAvailable = true;
    this.checkAudio();
  }

  ionViewDidEnter() {
    this.app.setTitle('CALVin');
  }

  onStart() {
    this.navCtrl.push(SelectTalkerPage)
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

  @HostListener('document:keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    this.handleKeyboardEvents(event);
  }

  @HostListener('document:keyup', ['$event'])
  keyup(event: KeyboardEvent) {
    this.handleKeyboardEvents(event);
  }

  handleKeyboardEvents(event) {
    let key = event.key || event.keyCode;
    switch (event.type) {
      case 'keydown':
        switch (key) {
          case 'F11':
          if (remote) {
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


}

