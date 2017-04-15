import { Injectable } from '@angular/core';

import { WordLists } from 'word-lists'

@Injectable()
export class AppData {


  currentSpeakerIndex: number;
  hvdIndex: number;
  keywordIndex: number;
  speakers: Array<{
    name: string,
    realName: string,
    avatarImageSrc: string,
  }>;
  vowelGroupIndex: number;
  constructor() {
    this.hvdIndex = -1;
    this.keywordIndex = -1;
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
    this.vowelGroupIndex = 0;
  }

}
