import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebRecorder } from '../../providers/web-recorder';
//import { Snap } from 'snapsvg';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('svg') svgElement: ElementRef;
  recorder: any;

  constructor(public navCtrl: NavController,
  public webRecorder: WebRecorder) {
    console.log(navigator.getUserMedia);
    this.recorder = null;

    //
  }

  ngAfterViewInit() {
    console.log(this.svgElement);
    //console.log(snapsvg)
    var snap = Snap('#svg')

    var bigCircle = snap.circle(150, 150, 100);
}

  onFail(e) {
    				console.log('Rejected!', e);
    			};

  onSuccess(s) {
        var context = new AudioContext();
        var mediaStreamSource = context.createMediaStreamSource(s);

        this.recorder = this.webRecorder.GetRecorder(mediaStreamSource, {});
        this.recorder.record();

        // audio loopback
        // mediaStreamSource.connect(context.destination);
      }

  startRecording(audio) {
      if (navigator.getUserMedia) {
        var that = this;
        navigator.getUserMedia({audio: true},
          function(s){that.onSuccess(s)},
          function(e){that.onFail(e)});
      } else {
        console.log('navigator.getUserMedia not present');
      }
    }

  stopRecording(audio) {
    				this.recorder.stop();
    			this.recorder.exportWAV(function(s) {

                audio.src = window.URL.createObjectURL(s);
                audio.play()
        });
      }

}

