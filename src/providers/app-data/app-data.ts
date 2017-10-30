import { Injectable } from '@angular/core';
import { WordLists } from './word-lists';
import { Talkers } from './talkers';

import { beep } from './beep-cvs';
import { arpa_to_description_map, arpa_vowels, arpa_to_hvd_map } from './phonetics';

import * as CONFIG from './config.json';

export class Config {
  public talkers: Array<string>;
  public keywords: Array<string>;
  public exampleWords: Array<string>;
  public wordGroups: any;
  constructor() {
    this.talkers = CONFIG['talkers'];
    this.keywords = CONFIG['keywords'];
    this.exampleWords = CONFIG['exampleWords']
    this.wordGroups = CONFIG['wordGroups']
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


  getAudio(talkerId: string, wordId: string, type: string='keywords', extension: string='wav'): string {
    switch (type) {
      case 'example':
      case 'examples':
      case 'example_word':
      case 'example_words':
        return `assets/audio/example_words/${talkerId}/${wordId}.${extension}`;
      case 'keyword':
      case 'keywords':
        return `assets/audio/keywords/${talkerId || 'speaker1'}/${wordId}.${extension}`;
      case 'vowel':
      case 'vowels':
        return `assets/audio/vowels/${talkerId || 'mark'}/${wordId}.${extension}`;
    }
  }

  getVideo(talkerId: string, type: string='example_words', wordId: string, extension: string='mp4'): string {
    return `assets/video/${type}/${talkerId}/${wordId}.${extension}`;
  }

  getImage(wordId: string, type: string='example_words', extension: string='png'): string {
    return `assets/images/${type}/${wordId}.${extension}`;
  }

  setUpTalkers(config) {
    this.talkerList = config.talkers;
    this.talkers = config.talkers.reduce((obj, talker) => {
      let name = talker[0].toUpperCase() + talker.slice(1);
      return Object.assign(obj, {[talker]: new Talker(talker, name, name, talker)})}, {});
  }

  setUpKeywords(config) {
    this.keywordList = config.keywords;
    this.keywords = this.keywordList.reduce(
      (obj, keyword) => Object.assign(obj, {[keyword.toString()]: this.setUpWord(keyword)}), {})
  }

  setUpExampleWords(config: any) {
    this.exampleWordList = config.exampleWords;
    this.exampleWords = this.exampleWordList.reduce(
      (obj, word) => Object.assign(obj, {[word.toString()]: this.setUpWord(word)}), {})
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
    let word: string, words: Array<Word>, wordGroup: WordGroup;
    this.keywordGroups = {};
    this.keywordGroupList = [];
    if (Array.isArray(config.wordGroups)) {
      config.wordGroups.map((group) => {
        name = Object.keys(group)[0];
        this.keywordGroupList.push(name);
        words = group[name].map((word) => word.split('/')[1].trim());
        this.keywordGroups[name] = new WordGroup(name, name, words);
      });
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

