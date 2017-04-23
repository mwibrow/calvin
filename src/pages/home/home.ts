import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recorder: any;
  constructor(public navCtrl: NavController) {
    console.log(navigator.getUserMedia);
    this.recorder = null;
  }

  onFail(e) {
    				console.log('Rejected!', e);
    			};

  onSuccess(s) {
        var context = new AudioContext();
        var mediaStreamSource = context.createMediaStreamSource(s);

        this.recorder = new Recorder(mediaStreamSource, {});
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
        });
      }

}


export class Recorder {

  WORKER_PATH:string = '../../assets/js/recorderWorker.js';
  context: any;
  node: any;
  worker: any;
  recording: boolean;
  config: any;
  currCallback: any;
  constructor(source, cfg){
        this.config = cfg || {};
        var bufferLen = this.config.bufferLen || 4096;
        this.context = source.context;
        this.node = this.context.createScriptProcessor(2048, 2, 2);
        this.worker = new Worker(this.config.workerPath || this.WORKER_PATH);
        this.worker.postMessage({
          command: 'init',
          config: {
            sampleRate: this.context.sampleRate
          }
        });
        this.recording = false;
        this.currCallback = null;
        var that: any = this;
        this.node.onaudioprocess = function(e){
          if (!that.recording) return;
          that.worker.postMessage({
            command: 'record',
            buffer: [
              e.inputBuffer.getChannelData(0),
              e.inputBuffer.getChannelData(1)
            ]
          });
        }







        that = this;
        this.worker.onmessage = function(e){
          var blob = e.data;
          that.currCallback(blob);
        }

        source.connect(this.node);
        this.node.connect(this.context.destination);    //this should not be necessary
      };

      exportWAV(cb, type){
          this.currCallback = cb || this.config.callback;
          type = type || this.config.type || 'audio/wav';
          if (!this.currCallback) throw new Error('Callback not set');
          this.worker.postMessage({
            command: 'exportWAV',
            type: type
          });
        }


       configure (cfg){
          for (var prop in cfg){
            if (cfg.hasOwnProperty(prop)){
              this.config[prop] = cfg[prop];
            }
          }
        }

      record() {
        this.recording = true;
      }

       stop(){

          this.recording = false;
        }

        clear(){
          this.worker.postMessage({ command: 'clear' });
        }

        getBuffer = function(cb) {
          this.currCallback = cb || this.config.callback;
          this.worker.postMessage({ command: 'getBuffer' })
        }
}