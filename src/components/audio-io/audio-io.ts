import { Component, ElementRef, ViewChild} from '@angular/core';

import { AudioProvider } from '../../providers/audio/audio';

@Component({
  selector: 'audio-io',
  templateUrl: 'audio-io.html',
  providers: [ AudioProvider ]
})
export class AudioIOComponent {

  private audio: any;
  private webRecorder: any;
  private webAudioPlayer: any;
  private playing: boolean;
  private recording: boolean;
  @ViewChild('canvas')
  canvas:ElementRef;
  constructor(private me: ElementRef, public webAudio: AudioProvider ) {
    this.audio = null;

    // this.webRecorder = new WebAudioRecorder();
    // this.webAudioPlayer = new WebAudioPlayer();
    this.webRecorder = webAudio.getAudioRecorder();
    this.webAudioPlayer = webAudio.getAudioPlayer();

    this.playing = false;
    this.recording = false;
  }

  ngAfterViewInit() {
    this.audio = this.me.nativeElement.querySelector('audio');

    //let WebAudioPlayer = this.webAudioPlayer;

    let visualiser = new WebAudioFloatFrequencyVisualiser({
      fftSize: 128,
      smoothingTimeConstant: 0.85
    });

    let canvas = this.canvas.nativeElement;
    let can = canvas.getContext('2d')
    canvas.width = 256;
    canvas.height = 128;
    can.clearRect(0, 0, canvas.width, canvas.height);
    visualiser.visualise = function(buffer) {
       can.clearRect(0, 0, canvas.width, canvas.height);
       can.beginPath();
      can.moveTo(0, canvas.height / 2)
      let w: number;
       for (var i=0;i <= 48; i ++) {
         w = 128+buffer[i];
         can.lineTo(128+i*2,  canvas.height / 2 - w / 2);
       }
       for (var i=48;i >=0; i --) {
         w = 128+buffer[i];
         can.lineTo(128+i*2,  canvas.height / 2 + w / 2);
       }
         for (var i=0;i <= 48; i ++) {
         w = 128+buffer[i];
         can.lineTo(128-i*2,  canvas.height / 2 + w / 2);
       }
         for (var i=48;i >=0; i --) {
         w = 128+buffer[i];
         can.lineTo(128-i*2,  canvas.height / 2 - w / 2);
       }


       can.closePath();
      can.fillStyle = 'red';
     can.fill()
    }

    visualiser.initialise(this.webRecorder);
    this.webAudioPlayer.initialise();

    this.webRecorder.onEnded.add(() => this.webAudioPlayer.playBuffer(this.webRecorder.recordBuffer));

    this.webRecorder.initialise();
  }


  loadAudio(uri: string, cb: (data: any) => void) {
    let that: AudioIOComponent = this;
    this.audio.oncanplaythrough = function() {
      that.audio.oncanplaythrough = null;
      cb(that.audio);
    };
    this.audio.src = uri;
    this.audio.load();
  }

  playStart(uri?: string) {
    if (!this.recording) {
      this.playing = true;
      let that = this;
      this.audio.onended = function(e) {
        that.audio.onended = null;
        that.playing = false;
      };
      if (uri) {
        this.loadAudio(uri, function(a){ a.play(); });
      } else {
        console.log('Playing audio');
        this.audio.play();
      }
    }
  }

  playStop() {
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
    }
  }

  rewind() {
    if (!this.playing && !this.recording) {
      this.audio.currentTime = 0;
    }
  }

  uiRecordStart() {
    //this.recordStart();
    //this.webAudioPlayer.loadAudio('assets/audio/emma/ball.wav');
    this.webRecorder.recordAudio();
  }

  uiRecordStop() {
    // this.recordStop();
    // this.recording = false;
    // let that = this;
    // window.setTimeout(function(){that.audio.play();}, 2000);
    // this.playStart('assets/audio/emma/ball.wav');
   // this.webAudioPlayer.playAudio();
   this.webRecorder.stop();
  }
  recordStart() {
    if (!this.playing && !this.recording) {
      this.recording = true;
      console.log('Starting recording');
      this.webRecorder.recordAudio();
    }
  }

  recordStop() {
    if (!this.playing && this.recording) {
      console.log('Stopping recording');
      this.webRecorder.stop();
      this.recording = false;
    }
  }

}


class WebAudioByteFrequencyVisualiser {

  analyser: AnalyserNode;
  buffer: Uint8Array;
  visualise: any;
  running: boolean;
  analyserProperties: any;

  constructor(analyserProperties?: any) {
    this.analyser = this.buffer = this.visualise = null;
    this.running = false;
    this.analyserProperties = analyserProperties;

  }

  initialise(player: any) {
    player.onInitialise.add((context) => this._initialise(context, player));
  }

  _initialise(context, player: any) {
    let property: any;
    player.onStart.add(() => this.start());
    player.onStop.add(() => this.stop());
    player.onEnded.add(() => this.stop());
    this.analyser = player.context.createAnalyser()

    for (property in this.analyserProperties) {
      if (this.analyserProperties.hasOwnProperty(property)) {
        this.analyser[property] = this.analyserProperties[property];
      }
    }
    let filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;
    player.addNode(filter);
    filter.connect(this.analyser);
    this.buffer = new Uint8Array(this.analyser.frequencyBinCount);
  }

  start() {
    this.running = true;
    window.requestAnimationFrame((event) => this._visualise(event));
  }

  stop() {
    this.running = false;
  }

  _visualise(event: any) {
    this.analyser.getByteFrequencyData(this.buffer);
    this.visualise && this.visualise(this.buffer);
    if (this.running) {
       window.requestAnimationFrame((event) => this._visualise(event));
    }
  };


}

class WebAudioFloatFrequencyVisualiser {

  analyser: AnalyserNode;
  buffer: Float32Array;
  visualise: any;
  running: boolean;
  analyserProperties: any;

  constructor(analyserProperties?: any) {
    this.analyser = this.buffer = this.visualise = null;
    this.running = false;
    this.analyserProperties = analyserProperties;

  }

  initialise(player: any) {
    player.onInitialise.add((context) => this._initialise(context, player));
  }

  _initialise(context, player: any) {
    let property: any;
    player.onStart.add(() => this.start());
    player.onStop.add(() => this.stop());
   // player.onEnded = () => this.stop();
    this.analyser = player.context.createAnalyser()

    for (property in this.analyserProperties) {
      if (this.analyserProperties.hasOwnProperty(property)) {
        this.analyser[property] = this.analyserProperties[property];
      }
    }
    let filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;
    player.addNode(filter);
    filter.connect(this.analyser);
    this.buffer = new Float32Array(this.analyser.frequencyBinCount);
  }

  start() {
    this.running = true;
    window.requestAnimationFrame((event) => this._visualise(event));
  }

  stop() {
    this.running = false;
  }

  _visualise(event: any) {
    this.analyser.getFloatFrequencyData(this.buffer);
    this.visualise && this.visualise(this.buffer);
    if (this.running) {
       window.requestAnimationFrame((event) => this._visualise(event));
    }
  };


}

