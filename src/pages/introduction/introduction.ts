import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the IntroductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})

export class IntroductionPage {

  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroductionPage');
  }

  getFadeOut() {
    if (this.slides.getActiveIndex() === 3) {

      return "slide-image image-front fade-out";
    }
    return "slide-image image-front";
  }

  getFadeIn() {
    if (this.slides.getActiveIndex() === 3) {

      return "slide-image image-front fade-in";
    }
    return "slide-image image-front";
  }

}
