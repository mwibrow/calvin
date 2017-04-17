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

    this.vowelGroups = {
      highFront: {
        display: 'High front',
        keywords: ['heed', 'hid', 'head'],
        examples: []
      },
      Open: {
        display: 'Open',
        keywords: ['had', 'hod', 'hud'],
        examples: []
      },
      centralLowBack: {
        display: 'Central low back',
        keywords: ['hard', 'heard', 'hoard'],
        examples: []
      },
      back: {
        display: 'Back',
        keywords: ['hood', 'how\'d', 'who\'d'],
        examples: []
      },
      diphthongs: {
        display: 'Diphthongs',
        keywords: ['haired', 'hayed', 'hide', 'hoed', 'how\'d', 'hoyed'],
        examples: []
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
            group: vowelGroupId
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
}