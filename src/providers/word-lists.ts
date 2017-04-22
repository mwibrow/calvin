import { Injectable } from '@angular/core';

@Injectable()
export class WordLists {

  public keywords: any[];

  public vowelGroups: any;
  public vowelGroupIds: string[];

  constructor() {

    var vowelGroup: any;

    this.vowelGroupIds = [];
    this.keywords = [];

    // heed, hid, head, had, hard, hod, hoard, who’d, hood, hud, heard, hayed, hide, how’d, hoed, haired, hoyed
    // hiːd, hɪd, hɛd, hæd, hɑːd, hɒd, hɔːd, huːd, hʊd, hʌd, hɜːd, heɪd, haɪd, haʊd, həʊd, heəd, hɔɪd


    // cot, pot, clock
    // card, shark, park
    // Seed, teeth, bees
    // pin, bin, ring
    // foot, wood, book
    // clown, mouse, house
    // kite, knife, bike
    // spade, cake, gate
    // nurse, skirt, shirt
    // pears, Bears, squares
    // toys, boys, coin
    // suit, food, room
    // sword, paws, ball
    // men, leg, ten
    // road, coat, loaf
    // cat, hat, mat
    // gears, piers, tears

    this.vowelGroups = {
      highFront: {
        display: 'High front',
        keywords: ['heed', 'hid', 'head'],
        examples: {
          heed: ['seed', 'teeth', 'bees'],
          hid: ['pin', 'bin', 'ring'],
          head: ['men', 'leg', 'ten']
        }
      },
      Open: {
        display: 'Open',
        keywords: ['had', 'hod', 'hud'],
        examples: {
          had: ['cat', 'hat', 'mat'],
          hod: ['cot', 'pot', 'clock'],
          hud: []
        }
      },
      centralLowBack: {
        display: 'Central low back',
        keywords: ['hard', 'heard', 'hoard'],
        examples: {
          hard: ['card', 'shark', 'park'],
          heard: ['nurse', 'skirt', 'shirt'],
          hoard: ['sword', 'paws', 'ball']
        }
      },
      back: {
        display: 'Back',
        keywords: ['hood', 'who\'d'],
        examples: {
          hood: ['foot', 'wood', 'book'],
          'who\'d': ['suit', 'food', 'room']
        }
      },
      diphthongs: {
        display: 'Diphthongs',
        keywords: ['haired', 'hayed', 'hide', 'hoed', 'how\'d', 'hoyed'],
        examples: {
          haired: ['pears', 'bears', 'squares'],
          hayed: ['spade', 'cake', 'gate'],
          hide: ['kite', 'knife', 'bike'],
          hoed: [],
          'how\'d': ['clown', 'mouse', 'house'],
          hoyed: ['toys', 'boys', 'coin']
        }
      }
    };

    for (var vowelGroupId in this.vowelGroups) {
      if (this.vowelGroups.hasOwnProperty(vowelGroupId)) {
        this.vowelGroupIds.push(vowelGroupId);

        vowelGroup = this.vowelGroups[vowelGroupId];

        var that = this;
        vowelGroup.keywords.map(function(keyword: string) {
          that.keywords.push({
            id: keyword,
            display: keyword,
            group: vowelGroupId,
            examples: vowelGroup.examples[keyword]
          });
        });
      }
    }
  }

  getVowelGroupById(id: string) {
    return this.vowelGroups[id];
  }

   getVowelGroupByIndex(index: number) {
    return this.vowelGroups[this.vowelGroupIds[index]];
  }

  getExamples(vowelGroupIndex, keyword) {
    if (vowelGroupIndex >= 0 && keyword) {
      var examples = this.getVowelGroupByIndex(vowelGroupIndex).examples;
        if (examples.hasOwnProperty(keyword)) {
          return examples[keyword];
        }
    }
    return [];
  }
}