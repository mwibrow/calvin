import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-video-player-page',
  templateUrl: 'video-player-page.html',
})
export class VideoPlayerPage {

  videoName: string;
  videoSrc: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform) {

    this.videoName = navParams.data.videoName;
    this.videoSrc = '../../assets/video/hvd.mp4';
    console.log(navParams.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPlayerPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
