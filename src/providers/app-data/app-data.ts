import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { WordLists } from './word-lists';
import { Talkers } from './talkers';
/*
  Generated class for the AppDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export enum TalkerMode {
    Single,
    Multiple
};

@Injectable()
export class AppDataProvider {

  talkers: any;

  words: any;
  keywords: any;
  talkerList: Array<string>;
  keywordList: Array<string>;
  talkerMode: TalkerMode;
  talker: string;

  constructor(public http: Http) {
    console.log('Hello AppDataProvider Provider');

    this.words = WordLists.WORDS;
    this.keywordList = WordLists.KEYWORD_LIST;
    this.keywords = WordLists.KEYWORDS;

    this.talkers = Talkers.TALKERS;
    this.talkerList = Talkers.TALKER_LIST;


    this.talkerMode = TalkerMode.Multiple;
    this.talker = 'emma';
  }

  getAudio(talker: string, word: string, extension: string='wav'): string {
    return `assets/audio/${talker}/${word}.${extension}`;
  }

  getVideo(talker: string, word: string, extension: string='mp4'): string {
    return `assets/video/${talker}/${word}.${extension}`;
  }

  getImage(word: string, extension: string='png'): string {
    return `assets/images/${word}.${extension}`;
  }




}
