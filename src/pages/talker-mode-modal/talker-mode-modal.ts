import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TalkerModeModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-talker-mode-modal',
  templateUrl: 'talker-mode-modal.html',
})
export class TalkerModeModal {

  private talkerMode: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.talkerMode = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TalkerModeModalPage');
  }

  nextButtonDisabled() {
    if (this.talkerMode === "") {
      return "true";
    }
  }

}
