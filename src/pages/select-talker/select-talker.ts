import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
import { IntroductionPage } from '../introduction/introduction';
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
    let next: boolean = false;
    switch (this.page) {
      case 1:
        if (this.talkerMode === "multiple") {
           next = true;
        } else {
          this.page += 1;
        }
        break;
      case 2:
        next = true;
    }
    if (next) {
      this.appData.talkerMode = this.talkerMode;
      this.appData.talker = this.talker;
      this.navCtrl.push(IntroductionPage);
    }
  }

  backClicked() {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

}
