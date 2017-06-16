import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { TalkerModeModal } from '../talker-mode-modal/talker-mode-modal';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
    setTimeout( () => {
      this.presentTalkerModeModal();
    }, 2500);
  }

  presentTalkerModeModal() {
    let modal = this.modalCtrl.create(TalkerModeModal);
    modal.present();
  }
}
