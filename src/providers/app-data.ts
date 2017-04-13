import { Injectable } from '@angular/core';

@Injectable()
export class AppData {


  currentSpeakerIndex: number;
  speakers: Array<{
    name: string,
    realName: string,
    avatarImageSrc: string,
  }>;
  constructor() {
    var speakerPath: string = 'assets/images/speakers/'
    this.currentSpeakerIndex = 1;
    this.speakers = [
      {
        name: 'Ali',
        realName: 'Ali',
        avatarImageSrc: speakerPath + 'ali.png'
      },
      {
        name: 'Calvin',
        realName: 'Calvin',
        avatarImageSrc: speakerPath + 'calvin.png'
      },
      {
        name: 'Jami',
        realName: 'Jami',
        avatarImageSrc: speakerPath + 'jami.png'
      },
      {
        name: 'Leyla',
        realName: 'Layla',
        avatarImageSrc: speakerPath + 'leyla.png'
      },
      {
        name: 'Mavi',
        realName: 'Mavi',
        avatarImageSrc: speakerPath + 'mavi.png'
      },
      {
        name: 'Noor',
        realName: 'Noor',
        avatarImageSrc: speakerPath + 'noor.png'
      }
    ];
  }

}
