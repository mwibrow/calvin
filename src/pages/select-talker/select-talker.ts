import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { AppDataProvider, Talker } from '../../providers/app-data/app-data';
/**
 * Generated class for the SelectTalkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-talker',
  templateUrl: 'select-talker.html',
})
export class SelectTalkerPage {

  constructor(
    public appData: AppDataProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTalkerPage');
  }

  setTalker(talker: Talker) {
    this.appData.setTalker(talker);
  }

  cancel() {
    this.viewCtrl.dismiss(false);
  }

  continue() {
    this.viewCtrl.dismiss(true);
  }

  isTalker(talker: Talker) {
    return this.appData.talker && this.appData.talker.id === talker.id;
  }
  getTalkers() {
    let talkers = this.appData.config.exampleWords.talkerIds.map(id => this.appData.talkers[id]);
    return talkers;
  }

}
