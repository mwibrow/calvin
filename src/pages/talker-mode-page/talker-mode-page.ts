import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
/**
 * Generated class for the TalkerModePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-talker-mode-page',
  templateUrl: 'talker-mode-page.html',
})
export class TalkerModePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TalkerModePage');
  }

}
