import { Injectable } from '@angular/core';

@Injectable()
export class AppData {


  speakerIndex: number;
  hvdIndex: number;
  keywordIndex: number;
  speakers: any[];
  vowelGroupIndex: number;
  constructor() {
    this.hvdIndex = -1;
    this.keywordIndex = -1;
    var speakerPath: string = 'assets/images/speakers/'
    this.speakerIndex = 1;
    this.speakers = [
      {
        display: 'Ali',
        id: 'mark',
        avatarImageSrc: speakerPath + 'ali.png'
      },
      {
        display: 'Calvin',
        id: 'mark',
        avatarImageSrc: speakerPath + 'calvin.png'
      },
      {
        display: 'Leyla',
        id: 'mark',
        avatarImageSrc: speakerPath + 'leyla.png'
      },
      {
        display: 'Mavi',
        id: 'mark',
        avatarImageSrc: speakerPath + 'mavi.png'
      }
    ];
    this.vowelGroupIndex = 0;
  }

}
