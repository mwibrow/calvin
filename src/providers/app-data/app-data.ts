import { Injectable } from '@angular/core';
import { WordLists } from './word-lists';
import { Talkers } from './talkers';

import { beep } from './beep-cvs';
import { arpa_to_description_map, arpa_vowels, arpa_to_hvd_map } from './phonetics';

import * as CONFIG from './config.json';

export class Config {
  public talkers: Array<String>;
  public keywords: Array<String>;
  public exampleWords: Array<String>;

  constructor() {
    this.talkers = CONFIG['talkers'];
    this.keywords = CONFIG['keywords'];
    this.exampleWords = CONFIG['exampleWords']
  }

}

@Injectable()
export class AppDataProvider {

  config: Config;

  talkers: any;
  talkerList: Array<string>;
  keywords: any;
  keywordList: Array<string>;
  exampleWords: any;
  exampleWordList: Array<string>;

  talker: string;

  constructor() {
    this.config = new Config();

    this.setUpTalkers(this.config);
    this.setUpKeywords(this.config);
    this.setUpExampleWords(this.config);

    this.talker = 'dan';
  }


  getAudio(talker: string, word: string, type: string='words', extension: string='wav'): string {
    switch (type) {
      case 'example':
      case 'examples':
      case 'example_word':
      case 'example_words':
        return `assets/audio/example_words/${talker}/${word}.${extension}`;
      case 'keyword':
      case 'keywords':
        return `assets/audio/keyword/${talker || 'speaker1'}/${word}.${extension}`;
      case 'vowel':
      case 'vowels':
        return `assets/audio/vowel/${talker || 'mark'}/${word}.${extension}`;
    }
  }

  getVideo(talker: string, type: string='example_words', word: string, extension: string='mp4'): string {
    return `assets/video/${type}/${talker}/${word}.${extension}`;
  }

  getImage(word: string, type: string='example_words', extension: string='png'): string {
    return `assets/images/${type}/${word}.${extension}`;
  }

  setUpTalkers(config) {
    this.talkerList = config.talkers;
    this.talkers = config.talkers.map((talker) => {
      let name = talker[0].toUpperCase() + talker.slice(1);
      return {
        id: talker,
        realName: name,
        displayName: name,
        avatar: talker
      }
    });
  }

  setUpKeywords(config) {
    this.keywordList = config.keywords;
    console.log(config)
    this.keywords = this.keywordList.map((keyword) => this.setUpWord(keyword))
  }

  setUpExampleWords(config) {
    this.exampleWordList = config.exampleWords;
    this.exampleWords = this.exampleWordList.map((word) => this.setUpWord(word))
  }

  setUpWord(word) {
    let arpa: string, vowels: Array<string>, vowel: string, hvd: string;
    arpa = beep[word];
    if (!arpa) console.error(`No ARPAbet transliteration for '${word}'`)
    vowels = arpa.split(' ').filter(v => arpa_vowels.indexOf(v) !== -1)
    if (!vowels.length) console.error(`No ARPAbet vowel in '${word}'`)
    vowel = arpa_vowels[0]
    hvd = arpa_to_hvd_map[vowel]
    if (!hvd) console.error(`No HVD for ARPAbet syllable '${vowel}'`)
    return {
        display: word,
        highlight: highlightVowel(word),
        vowel: hvd,
        description: arpa_to_description_map[vowel]
    }
  }

}

export const highlightVowel = (word:string) => {
  let exceptions = {'squares': 'squ<are>s'};
  if (exceptions[word]) {
    return exceptions[word]
  } else {
    return word.replace(/(igh|[aeiou]+(?:[yrw]{1,2})?[aeiou]*)/, '<$1>')
  }
}
