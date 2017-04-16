import { Injectable } from '@angular/core';

@Injectable()
export class WordLists {

  public hvds: any[];
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

    var hvdList: string[];
    var i: number;

    var hvdList = [
      'heed',
      'hid',
      'head',
      'had',
      'hard',
      'hod',
      'hoard',
      'who\'d',
      'hood',
      'hud',
      'heard',
      'hayed',
      'hide',
      'how\'d',
      'hoed',
      'haired',
      'hoyed'
    ];
    this.hvds = [];
    for (i = 0; i < hvdList.length; i++) {
      this.hvds.push({
        id: hvdList[i].replace(/\'/g, ''),
        display: hvdList[i]
      });
    }


    this.vowelGroups = [
      {
        id: 'high-front',
        title: 'High front',
        hvds: [ 'heed', 'hid', 'head' ],
        keywords: [
          {
            word: 'key',
            imageSrc: ''
          },
          {
            word: 'lid',
            imageSrc: ''
          },
          {
            word: 'bed',
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
        hvds: [ 'who\'d', 'how\'d' ],
        keywords: [
          {
            word: 'reel',
            imageSrc: ''
          }
        ]
      },
      {
        id: 'diphthongs',
        title: 'Diphthong',
        hvds: [ 'hayed', 'hide', 'hoed' ],
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
