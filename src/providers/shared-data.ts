import { Injectable } from '@angular/core';

@Injectable()
export class SharedData {


  currentSpeakerIndex: number;
  speakers: Array<{
    name: string,
    realName: string,
    avatarImageSrc: string,
  }>;
  constructor() {
    this.currentSpeakerIndex = 1;
    this.speakers = [
      {
        name: 'Ali',
        realName: 'Ali',
        avatarImageSrc: 'assets/images/ali.png'
      },
      {
        name: 'Calvin',
        realName: 'Calvin',
        avatarImageSrc: 'assets/images/calvin.png'
      },
      {
        name: 'Jami',
        realName: 'Jami',
        avatarImageSrc: 'assets/images/jami.png'
      },
      {
        name: 'Leyla',
        realName: 'Layla',
        avatarImageSrc: 'assets/images/leyla.png'
      },
      {
        name: 'Mavi',
        realName: 'Mavi',
        avatarImageSrc: 'assets/images/mavi.png'
      },
      {
        name: 'Noor',
        realName: 'Noor',
        avatarImageSrc: 'assets/images/noor.png'
      }
    ];
  }

}
