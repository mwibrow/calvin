import { Injectable } from '@angular/core';
import { WordLists } from './word-lists';
import { Talkers } from './talkers';


@Injectable()
export class AppDataProvider {

  talkers: any;

  words: any;
  keywords: any;
  talkerList: Array<string>;
  keywordList: Array<string>;
  keywordExamples: any;
  talker: string;

  constructor() {

    this.words = WordLists.WORDS;
    this.keywordList = WordLists.KEYWORD_LIST;
    this.keywords = WordLists.KEYWORDS;
    this.keywordExamples = WordLists.KEYWORD_EXAMPLES_LIST;
    this.talkers = Talkers.TALKERS;
    this.talkerList = Talkers.TALKER_LIST;

    this.talker = null;
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
