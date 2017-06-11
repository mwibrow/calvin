import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
/**
 * Generated class for the SelectTalkerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-talker',
  templateUrl: 'select-talker.html'
})
export class SelectTalkerPage {

  private talkerMode: any;
  private talker;
  private page: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {
    console.log(appData)
    this.talkerMode = "";
    this.talker = "";
    this.page = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTalkerPage');
  }

  nextButtonDisabled() {
    console.log(this.talkerMode);
    if (this.page === 1) {
      if (this.talkerMode === "") {
        return "true"
      }
    }
     if (this.page === 2) {
      if (this.talker === "") {
        return "true"
      }
    }
  }

  nextClicked() {
    this.page += 1;

  }

  backClicked() {
    this.page -= 1;

  }

}
