import { Component, Pipe, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebRecorder } from '../../providers/web-recorder';
import { Svg } from '../../providers/svg';
import { SafePipe } from '../../pipes/safe-pipe';

import { AudioIO } from '../../components/audio-io/audio-io';
//import { Snap } from 'snapsvg';
//import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

@Pipe({
   name: 'safePipe',
  pure: false
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  @ViewChild('svg') svgElement: ElementRef;
  @ViewChild('media') audio: ElementRef;
  @ViewChild('audio1') audio1: AudioIO;
  recorder: any;
  svg: Svg;
  safe: SafePipe;
  webRecorder: WebRecorder;
  constructor(public navCtrl: NavController) {
    console.log(navigator.getUserMedia);
    this.recorder = null;
    this.svg = new Svg();
    console.log(this.svg);
    //this.webRecorder = new WebRecorder();
    //
  }

  ngAfterViewInit() {
     //this.webRecorder.initialise(this.audio.nativeElement);
     //this.audio1.playStart('assets/audio/chloe.wav');
    //  let that = this;
    //  setTimeout(function(){ that.audio1.playStop(); }, 1000);
  }

  startRecording() {
    //this.webRecorder.startRecording();
    this.audio1.recordStart();
  }

  stopRecording(audio) {
    this.audio1.recordStop();
    //  this.webRecorder.stopRecording();
    //  var that = this;
    //  this.audio.nativeElement.oncanplaythrough = function() {
    //       that.audio.nativeElement.play();
    //  };

  }

  play() {
    this.audio1.playStart();
  }

}

