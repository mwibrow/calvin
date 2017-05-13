import { Component, Pipe, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { Svg } from '../../providers/svg';
import { SafePipe } from '../../pipes/safe-pipe';

@Pipe({
   name: 'safePipe',
   pure: false
})
@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class Introduction {



  @ViewChild(Slides) slides: Slides;
  svg: Svg;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.svg = new Svg();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Introduction');
  }

  slideChanged() {

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
