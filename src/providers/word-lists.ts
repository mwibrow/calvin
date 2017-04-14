import { Injectable } from '@angular/core';

@Injectable()
export class WordLists {

  public hvds: Array<string>;
  public vowelGroups: Array<{
    id: string,
    title: string,
    hvds: Array<string>,
    keywords: Array<{
      word: string,
      imageSrc: string
    }>
  }>;


  constructor() {
    this.hvds = [
      'heed',
      'hid',
      'head',
      'had',
      'hud',
      'hod',
      'heard',
      'hard',
      'hoard',
      'who\'d',
      'howd',
      'hoed',
      'hayed',
      'hide'
    ];
    this.vowelGroups = [
      {
        id: 'high-front',
        title: 'High front',
        hvds: [ 'heed', 'hid', 'head' ],
        keywords: [
          {
            word: 'reel',
            imageSrc: ''
          }
        ]
      },
      {
        id: 'open',
        title: 'Open',
        hvds: [ 'had', 'hud', 'hod' ],
        keywords: [
          {
            word: 'reel',
            imageSrc: ''
          }
        ]
      },
      {
        id: 'central-low-back',
        title: 'Central low back',
        hvds: [ 'heard', 'hard', 'hoard' ],
        keywords: [
          {
            word: 'reel',
            imageSrc: ''
          }
        ]
      },
      {
        id: 'back',
        title: 'Back',
        hvds: [ 'who\'d', 'how\'d', 'hoed' ],
        keywords: [
          {
            word: 'reel',
            imageSrc: ''
          }
        ]
      },
      {
        id: 'diphthongs',
        title: 'Diphthongs',
        hvds: [ 'hayed', 'hide' ],
        keywords: [
          {
            word: 'reel',
            imageSrc: ''
          }
        ]
      }
    ];
    console.log('Hello WordLists Provider');
  }

  getVowelGroupById(id: string){
    var i;
    for (i = 0; i < this.vowelGroups.length; i++) {
      if (this.vowelGroups[i].id === id) {
        return this.vowelGroups[i];
      }
    }
    return null;
  }
}
