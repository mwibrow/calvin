import { Component, Pipe, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebRecorder } from '../../providers/web-recorder';
import { Svg } from '../../providers/svg';
import { SafePipe } from '../../pipes/safe-pipe';
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
  recorder: any;
  svg: Svg;
  safe: SafePipe;
  webRecorder: WebRecorder;
  constructor(public navCtrl: NavController) {
    console.log(navigator.getUserMedia);
    this.recorder = null;
    this.svg = new Svg();
    console.log(this.svg);
    this.webRecorder = new WebRecorder();
    //
  }

  ngAfterViewInit() {
     this.webRecorder.initialise(this.audio.nativeElement);
  }

  startRecording() {
    this.webRecorder.startRecording();
  }

  stopRecording(audio) {
     this.webRecorder.stopRecording();
     var that = this;
     this.audio.nativeElement.oncanplaythrough = function() {
          that.audio.nativeElement.play();
     };

  }

}

