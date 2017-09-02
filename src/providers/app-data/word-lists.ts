
import { beep } from './beep-cvs';
import { arpa_to_description_map, arpa_vowels, arpa_to_hvd_map } from './phonetics';

export namespace WordLists {

  export const WORD_LIST: Array<string> = [
    'cot',
    'pot',
    'clock',
    'card',
    'shard',
    'park',
    'seed',
    'teeth',
    'bees',
    'pin',
    'bin',
    'ring',
    'foot',
    'wood',
    'book',
    'clown',
    'mouse',
    'house',
    'kite',
    'knife',
    'bike',
    'spade',
    'cake',
    'gate',
    'nurse',
    'skirt',
    'shirt',
    'pears',
    'bears',
    'squares',
    'toys',
    'boys',
    'coin',
    'suit',
    'food',
    'room',
    'sword',
    'paws',
    'ball',
    'men',
    'leg',
    'ten',
    'road',
    'coat',
    'loaf',
    'cat',
    'hat',
    'mat',
    'gears',
    'piers',
    'tears',
    // Keywords
    'knot',
    'dart',
    'knee',
    'tin',
    'bull',
    'cloud',
    'crown',
    'light',
    'lake',
    'girl',
    'dirt',
    'earth',
    'stairs',
    'joint',
    'joy',
    'soup',
    'port',
    'red',
    'shed',
    'coke',
    'toed',
    'soak',
    'bag',
    'tag',
    'flag',
    'near',
    'cheer',
    'fear',
    'ear',
    'toad'
  ]

  let words: any = {}
  let arpa: any, arpa_vowel: string, hvd: string;

  for (let i = 0; i < WORD_LIST.length; i ++) {
    arpa = beep[WORD_LIST[i]];
    if (!arpa) console.error(`No ARPAbet transliteration for '${WORD_LIST[i]}'`)
    arpa_vowel = arpa.split(' ').filter(v => arpa_vowels.indexOf(v) !== -1)
    hvd = arpa_to_hvd_map[arpa_vowel]
    if (!arpa) console.error(`No HVD for ARPAbet syllable '${arpa_vowel}'`)
    words[WORD_LIST[i]] = {
      display: WORD_LIST[i],
      highlight: WORD_LIST[i].replace(/(igh|[aeiou]+(?:[yrw]{1,2})?[aeiou]*)/, '<$1>'),
      vowel: hvd,
      description: arpa_to_description_map[arpa_vowel]
    }
  }

  export const WORDS = words;


    export const KEYWORD_LIST: Array<string> = [
        'knot', 'dart', 'knee', 'tin', 'bull', 'cloud', 'crown', 'light', 'lake', 'girl',
        'dirt', 'earth', 'stairs', 'joint', 'joy', 'soup', 'port', 'red', 'shed',
        'coke', 'toad', 'soak', 'bag', 'tag', 'flag', 'near', 'cheer', 'fear', 'ear'
    ].sort();

    export const KEYWORD_EXAMPLES_LIST: object = {
      knot: ['cot', 'pot', 'clock'],
      dart: ['card', 'shark', 'park'],
      knee: ['seed', 'teeth', 'bees'],
      tin: ['pin', 'bin', 'ring'],
      bull: ['foot', 'wood', 'book'],
      cloud: ['clown', 'mouse', 'house'],
      crown: ['clown', 'mouse', 'house'],
      light: ['kite', 'knife', 'bike'],
      lake: ['spade', 'cake', 'gate'],
      girl: ['nurse', 'skirt', 'shirt'],
      dirt: ['nurse', 'skirt', 'shirt'],
      earth: ['nurse', 'skirt', 'shirt'],
      stairs: ['pears', 'bears', 'squares'],
      joint: ['toys', 'boys', 'coin'],
      joy: ['toys', 'boys', 'coin'],
      soup: ['suit', 'food', 'room'],
      port: ['sword', 'paws', 'ball'],
      red: ['men', 'leg', 'ten'],
      shed: ['men', 'leg', 'ten'],
      coke: ['road', 'coat', 'loaf'],
      toad: ['road', 'coat', 'loaf'],
      soak: ['road', 'coat', 'loaf'],
      bag: ['cat', 'hat', 'mat'],
      tag: ['cat', 'hat', 'mat'],
      flag: ['cat', 'hat', 'mat'],
      near: ['gears', 'piers', 'tears'],
      cheer: ['gears', 'piers', 'tears'],
      fear: ['gears', 'piers', 'tears'],
      ear: ['gears', 'piers', 'tears']
    };
    let keywords:any = {}, i: number;
    for (i = 0; i < KEYWORD_LIST.length; i ++) {
      keywords[KEYWORD_LIST[i]] = WORDS[KEYWORD_LIST[i]];
    }
    export const KEYWORDS: any = keywords;

}
