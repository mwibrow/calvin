import { Injectable } from '@angular/core';
import { WordLists } from './word-lists';
import { Talkers } from './talkers';

import { beep } from './beep-cvs';
import { arpa_to_description_map, arpa_vowels, arpa_to_hvd_map } from './phonetics';

import * as CONFIG from './config.json';


export class WordTypes {
  static Keywords = 'keywords';
  static ExampleWords = 'example_words';
  static Vowels ='vowels';
}

export class Config {

  public WordTypes = WordTypes;
  public talkers: Array<string>;
  public keywords: {
    WordTypes: Array<string>,
    talkerIds: Array<string>,
    defaultTalkerId: string
  };
  public exampleWords: {
    WordTypes: Array<string>,
    talkerIds: Array<string>,
    defaultTalkerId: string
  };
  public vowels: {
    hvd: Array<string>,
    talkerIds: Array<string>,
    defaultTalkerId: string
  };
  public keywordGroups: any;
  constructor() {
    this.talkers = CONFIG['talkers'];
    this.keywords = CONFIG['keywords'];
    this.exampleWords = CONFIG['exampleWords']
    this.keywordGroups = CONFIG['keywordGroups']
  }

}

export class Word {
  complete: number = 0;
  constructor(public id: string,
    public display: string,
    public highlight: string,
    public hvd: string,
    public description: string) {};

  isComplete(): boolean {
    return this.complete === 1;
  }
}

export class Talker {
  constructor(public id: string,
    public realName: string,
    public displayName: string,
    public avatar: string) {};
}

export class WordGroup {
  complete: number = 0;
  constructor(public id: string,
    public display: string,
    public words: Array<Word>) {};

  isComplete():boolean {
    return this.complete === this.words.length;

  }

  completed(): number {
    return this.complete / this.words.length;
  }
}


@Injectable()
export class AppDataProvider {

  config: Config;

  talker: Talker;
  talkers: any;
  talkerList: Array<string>;
  talkerIndex: number = 0;

  keyword: Word;
  keywords: any;
  keywordList: Array<string>;
  keywordIndex: number = 0;

  exampleWord: Word;
  exampleWords: any;
  exampleWordList: Array<string>;
  exampleWordIndex: number = 0;

  keywordGroup: WordGroup;
  keywordGroups: any;
  keywordGroupList: Array<string>;
  keywordGroupIndex: number = 0;
  keywordExampleMap: any;

  constructor() {
    this.config = new Config();
    console.log('CONFIG', this.config)
    this.setUpTalkers(this.config);
    this.setUpKeywords(this.config);
    this.setUpExampleWords(this.config);
    this.setUpKeywordExampleMap();
    this.setUpKeywordGroups(this.config);
    this.getTalker();
    this.keyword = this.getKeyword();
    console.log(this)
  }

  getTalker(index?: number): Talker {
    let talker = this.talkers[this.talkerList[index || this.talkerIndex]];
    return talker;
  }

  setTalker(talker: Talker) {
    this.talker = talker;
    this.talkerIndex = this.talkerList.indexOf(talker.id);
  }

  getKeyword(): Word {
    return this.keywords[this.keywordList[this.keywordIndex]];
  }

  nextKeyword() {
    if (this.keywordIndex >= this.keywordList.length - 1) {
      this.keywordIndex = this.keywordList.length - 1;
    } else {
      this.keywordIndex ++;
    }
  }

  previousKeyword() {
    if (this.keywordIndex <= 0) {
      this.keywordIndex = 0;
    } else {
      this.keywordIndex --;
    }
  }

  prevKeyword() {
    this.keywordIndex = (this.keywordIndex % this.keywordList.length) + 1;
  }

  getExampleWord(): Word {
    return this.exampleWords[this.keywordExampleMap[this.getKeyword().hvd][this.exampleWordIndex]];
  }

  setExampleWordIndex(index: number) {
    this.exampleWordIndex = index;
  }

  getKeywordGroup(): WordGroup {
    return this.keywordGroups[this.keywordGroupList[this.keywordGroupIndex]];
  }

  setKeywordGroupIndex(index: number) {
    this.keywordGroupIndex = index;
  }

  getAudioUri(talkerId: string, wordId: string, type: WordTypes, extension: string='wav'): string {
    return `assets/audio/${type}/${talkerId}/${wordId}.${extension}`;
  }

  getVideoUri(talkerId: string, type: WordTypes, wordId: string, extension: string='mp4'): string {
    return `assets/video/${type}/${talkerId}/${wordId}.${extension}`;
  }

  getImageUri(wordId: string, type: WordTypes, extension: string='png'): string {
    return `assets/images/${type}/${wordId}.${extension}`;
  }

  setUpTalkers(config) {
    this.talkerList = config.talkers;
    this.talkers = config.talkers.reduce((obj, talker) => {
      let name = talker[0].toUpperCase() + talker.slice(1);
      return Object.assign(obj, {[talker]: new Talker(talker, name, name, talker)})}, {});
  }

  setUpKeywords(config) {
    this.keywordList = config.keywords.words;
    this.keywords = this.keywordList.reduce(
      (obj, keyword) => Object.assign(obj, {[keyword]: this.setUpWord(keyword)}), {})
  }

  setUpExampleWords(config: any) {
    this.exampleWordList = config.exampleWords.words;
    this.exampleWords = this.exampleWordList.reduce(
      (obj, word) => Object.assign(obj, {[word]: this.setUpWord(word)}), {})
  }

  setUpKeywordExampleMap() {
    let hvdMap = {}, word: Word;
    this.keywordExampleMap = {};
    this.exampleWordList.map((exampleWord) => {
      word = this.exampleWords[exampleWord];
      hvdMap[word.hvd] = Array.isArray(hvdMap[word.hvd]) ? hvdMap[word.hvd].concat(exampleWord) : [exampleWord]
    });
    this.keywordList.map((keyword) => {
      word = this.keywords[keyword];
      this.keywordExampleMap[word.hvd] = hvdMap[word.hvd];
    });
  }

  setUpWord(word) {
    let arpa: string, vowels: Array<string>, vowel: string, hvd: string;
    arpa = beep[word];
    if (!arpa) console.error(`No ARPAbet transliteration for '${word}'`)
    vowels = arpa.split(' ').filter(v => arpa_vowels.indexOf(v) !== -1)
    if (!vowels.length) console.error(`No ARPAbet vowel in '${word}'`)
    vowel = vowels[0]
    hvd = arpa_to_hvd_map[vowel]
    if (!hvd) console.error(`No HVD for ARPAbet syllable '${vowel}'`)
    return new Word(word.toLowerCase(), word, highlightVowel(word), hvd, arpa_to_description_map[vowel])
  }

  setUpKeywordGroups(config: any) {
    let group: any, name: string;
    let word: string, WordTypes: Array<Word>, wordGroup: WordGroup;
    this.keywordGroups = {};
    this.keywordGroupList = [];
    Object.keys(config.keywordGroups.groups).map((name) => {
      this.keywordGroupList.push(name);
      WordTypes = config.keywordGroups.groups[name].map((word) => {
        if (word.includes('/')) {
          return word.split('/')[1].trim()
        } else {
          return word;
        }
      });
      this.keywordGroups[name] = new WordGroup(name, name, WordTypes);
    });
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

