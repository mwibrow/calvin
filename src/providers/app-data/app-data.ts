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

  public talkers: {[id: string]: {display: String, avatar: string}}
  public WordTypes = WordTypes;
  public keywords: {
    talkers: string[],
    items: string[]
  };
  public words: {
    talkers: string[],
    items: string[]
  }
  public vowels: {
    talkers: string[],
    items: string[]
  }
  public keywordGroups: any;
  constructor() {
    this.talkers = CONFIG['talkers'];
    this.keywords = CONFIG['keywords'];
    this.words = CONFIG['words']
    this.keywordGroups = CONFIG['groups']
    this.vowels = CONFIG['vowels']
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
    public words: Array<string>) {};

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
  talkers: {[key: string]: Talker};
  talkerList: Array<string>;
  talkerIndex: number = 0;

  keyword: Word;
  keywords: {[key: string]: Word};;
  keywordList: Array<string>;
  keywordIndex: number = 0;

  exampleWord: Word;
  exampleWords: {[key: string]: Word};
  exampleWordList: Array<string>;
  exampleWordIndex: number = 0;

  keywordGroup: WordGroup;
  keywordGroups: {[key: string]: WordGroup};
  keywordGroupList: Array<string>;
  keywordGroupIndex: number = 0;
  keywordExampleMap: any;

  constructor() {
    this.config = new Config();
    this.setUpTalkers(this.config);
    this.setUpKeywords(this.config);
    this.setUpExampleWords(this.config);
    this.setUpKeywordExampleMap();
    this.setUpKeywordGroups(this.config);
    this.getTalker();
    this.keyword = this.getKeyword();
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
    let realType = 'words';
    if (type === WordTypes.Vowels) {
      realType = 'vowels'
      if (this.config.vowels.talkers.indexOf(talkerId) === -1) {
        talkerId = this.config.vowels.talkers[0]
      }
    }
    const uri = `assets/audio/${realType}/${talkerId}/${wordId}.${extension}`;
    return uri
  }

  getVideoUri(talkerId: string, type: WordTypes, wordId: string, extension: string='mp4'): string {
    let realType = 'words';
    if (type === WordTypes.Vowels) {
      realType = 'vowels'
    }
    return `assets/video/${realType}/${talkerId}/${wordId}.${extension}`;
  }

  getImageUri(wordId: string, type: WordTypes, extension: string='png'): string {
    let realType = 'words';
    if (type === WordTypes.Vowels) {
      realType = 'vowels'
    }
    return `assets/images/${realType}/${wordId}.${extension}`;
  }

  setUpTalkers(config) {
    this.talkerList = Object.keys(config.talkers);
    this.talkers = this.talkerList.reduce((obj, talker) => {
      let name = config.talkers[talker].display
      let avatar = config.talkers[talker].avatar
      return Object.assign(obj, {[talker]: new Talker(talker, name, name, avatar)})}, {});
  }

  setUpKeywords(config) {
    this.keywordList = config.keywords.items;
    this.keywords = this.keywordList.reduce(
      (obj, keyword) => Object.assign(obj, {[keyword]: this.setUpWord(keyword)}), {})
  }

  setUpExampleWords(config: any) {

    this.exampleWordList = config.words.items.filter(item => config.keywords.items.indexOf(item) === -1)
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

  setUpKeywordGroups(config: Config) {
    let words: Array<string>;
    this.keywordGroups = {};
    this.keywordGroupList = [];

    Object.keys(config.keywordGroups).map((name) => {
      this.keywordGroupList.push(name);
      words = config.keywordGroups[name].map((hvd) => {
        return this.keywordList.filter(keyword => this.keywords[keyword].hvd === hvd)[0]
      });
      this.keywordGroups[name] = new WordGroup(name, name, words);
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

