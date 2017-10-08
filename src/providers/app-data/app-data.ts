import { Injectable } from '@angular/core';
import { WordLists } from './word-lists';
import { Talkers } from './talkers';


@Injectable()
export class AppDataProvider {

  talkers: any;

  words: any;
  keywords: any;
  exampleList: Array<string>;
  talkerList: Array<string>;
  keywordList: Array<string>;
  keywordExamples: any;
  talker: string;

  constructor() {

    this.words = WordLists.WORDS;
    this.keywordList = WordLists.KEYWORD_LIST;
    this.keywords = WordLists.KEYWORDS;
    this.keywordExamples = WordLists.KEYWORD_EXAMPLES_LIST;
    this.exampleList = WordLists.EXAMPLE_LIST;
    this.talkers = Talkers.TALKERS;
    this.talkerList = Talkers.TALKER_LIST;

    this.talker = null;
  }

  getAudio(talker: string, word: string, type: string='words', extension: string='wav'): string {
    return `assets/audio/${talker}/${type}/${word}.${extension}`;
  }

  getVideo(talker: string, word: string, extension: string='mp4'): string {
    return `assets/video/${talker}/${word}.${extension}`;
  }

  getImage(word: string, type: string='words', extension: string='png'): string {
    return `assets/images/${type}/${word}.${extension}`;
  }

}
