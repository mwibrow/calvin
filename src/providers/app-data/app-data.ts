import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppDataProvider {

  talkers: any;
  words: any;
  keywords: any;
  keywordList: Array<string>;
  constructor(public http: Http) {
    console.log('Hello AppDataProvider Provider');

    this.words = {
      cot: {
        display: "cot",
        vowels: "c<o>t"
      },
      pot: {
        display: "pot",
        vowels: "p<o>t"
      },
      clock: {
        display: "clock",
        vowels: "cl<o>ck"
      },
      card: {
        display: "card",
        vowels: "c<ar>d"
      },
      shard: {
        display: "shark",
        vowels: "sh<ar>k"
      },
      park: {
        display: "park",
        vowels: "p<ar>k"
      },
      seed: {
        display: "seed",
        vowels: "s<ee>d"
      },
      teeth: {
        display: "teeth",
        vowels: "t<ee>th"
      },
      bees: {
        display: "bees",
        vowels: "b<ee>s"
      },
      pin: {
        display: "pin",
        vowels: "p<i>n"
      },
      bin: {
        display: "bin",
        vowels: "b<i>n"
      },
      ring: {
        display: "ring",
        vowels: "r<i>ng"
      },
      foot: {
        display: "foot",
        vowels: "f<oo>t"
      },
      wood: {
        display: "wood",
        vowels: "w<oo>d"
      },
      book: {
        display: "book",
        vowels: "b<oo>k"
      },
      clown: {
        display: "clown",
        vowels: "cl<ow>n"
      },
      mouse: {
        display: "mouse",
        vowels: "m<ou>se"
      },
      house: {
        display: "house",
        vowels: "h<ou>se"
      },
      kite: {
        display: "kite",
        vowels: "k<i>te"
      },
      knife: {
        display: "knife",
        vowels: "kn<i>fe"
      },
      bike: {
        display: "bike",
        vowels: "b<i>ke"
      },
      spade: {
        display: "spade",
        vowels: "sp<a>de"
      },
      cake: {
        display: "cake",
        vowels: "c<a>ke"
      },
      gate: {
        display: "gate",
        vowels: "g<a>te"
      },
      nurse: {
        display: "nurse",
        vowels: "n<ur>se"
      },
      skirt: {
        display: "skirt",
        vowels: "sk<ir>t"
      },
      shirt: {
        display: "shirt",
        vowels: "sh<ir>t"
      },
      pears: {
        display: "pears",
        vowels: "p<ear>s"
      },
      bears: {
        display: "display",
        vowels: "b<ear>s"
      },
      squares: {
        display: "squares",
        vowels: "squ<are>s"
      },
      toys: {
        display: "toys",
        vowels: "t<oy>s"
      },
      boys: {
        display: "boys",
        vowels: "b<oy>s"
      },
      coin: {
        display: "coin",
        vowels: "c<oi>n"
      },
      suit: {
        display: "suit",
        vowels: "s<ui>t"
      },
      food: {
        display: "food",
        vowels: "f<oo>d"
      },
      room: {
        display: "room",
        vowels: "r<oo>m"
      },
      sword: {
        display: "sword",
        vowels: "sw<or>d"
      },
      paws: {
        dispay: "paws",
        vowels: "p<aw>s"
      },
      ball: {
        display: "ball",
        vowels: "b<a>ll"
      },
      men: {
        display: "men",
        vowels: "m<e>n"
      },
      leg: {
        display: "leg",
        vowels: "l<e>g"
      },
      ten: {
        display: "ten",
        vowels: "t<e>n"
      },
      road: {
        display: "road",
        vowels: "r<oa>d"
      },
      coat: {
        display: "coat",
        vowels: "c<oa>t"
      },
      loaf: {
        display: "load",
        vowels: "l<oa>f"
      },
      cat: {
        display: "cat",
        vowels: "c<a>t"
      },
      hat: {
        display: "hat",
        vowels: "h<a>t"
      },
      mat: {
        display: "mat",
        vowels: "m<a>t"
      },
      gears: {
        display: "gears",
        vowels: "g<ear>s"
      },
      piers: {
        display: "piers",
        vowels: "p<ier>s"
      },
      tears: {
        display: "tears",
        vowels: "t<ear>s"
      },
      // Keywords
      knot: {
				display: "knot",
				vowels: "kn<o>t"
			},
      dart: {
				display: "dart",
				vowels: "d<ar>t"
			},
      knee: {
				display: "knee",
				vowels: "kn<ee>"
			},
      tin: {
				display: "tin",
				vowels: "t<i>n"
			},
      bull: {
				display: "bull",
				vowels: "b<u>ll"
			},
      cloud: {
				display: "cloud",
				vowels: "cl<ou>d"
			},
      crown: {
				display: "crown",
				vowels: "cr<o>wn"
			},
      light: {
				display: "light",
				vowels: "l<i>ght"
			},
      lake: {
				display: "lake",
				vowels: "l<a>ke"
			},
      girl: {
				display: "girl",
				vowels: "g<ir>l"
			},
      dirt: {
				display: "dirt",
				vowels: "d<ir>t"
			},
      earth: {
				display: "earth",
				vowels: "e<ar>th"
			},
      stairs: {
				display: "stairs",
				vowels: "st<air>s"
			},
      joint: {
				display: "joint",
				vowels: "j<oi>nt"
			},
      joy: {
				display: "joy",
				vowels: "j<oy>"
			},
      soup: {
				display: "soup",
				vowels: "s<ou>p"
			},
      port: {
				display: "port",
				vowels: "p<or>t"
			},
      red: {
				display: "red",
				vowels: "r<e>d"
			},
      shed: {
				display: "shed",
				vowels: "sh<e>d"
			},
      coke: {
				display: "coke",
				vowels: "c<o>ke"
			},
      toed: {
				display: "toad",
				vowels: "t<oa>d"
			},

      soak: {
				display: "soak",
				vowels: "s<oa>k"
			},
      bag: {
				display: "bag",
				vowels: "b<a>g"
			},
      tag: {
				display: "tag",
				vowels: "t<a>g"
			},
      flag: {
				display: "flag",
				vowels: "fl<a>g"
			},
      near: {
				display: "near",
				vowels: "n<ear>"
			},
      cheer: {
				display: "cheer",
				vowels: "ch<eer>"
			},
      fear: {
				display: "fear",
				vowels: "f<ear>"
			},
      ear: {
				display: "ear",
				vowels: "<ear>"
      }
    };
    let i: number;
    this.keywordList = [
      "knot", "dart", "knee", "tin", "bull", "cloud", "crown", "light", "lake", "girl",
      "dirt", "earth", "stairs", "joint", "joy", "soup", "port", "red", "shed",
      "coke", "toad", "soak", "bag", "tag", "flag", "near", "cheer", "fear", "ear"
    ].sort();
    this.keywords = {}
    for (i = 0; i < this.keywordList.length; i ++) {
      this.keywords[this.keywordList[i]] = this.words[this.keywordList[i]];
    }
    this.talkers = {
      emma: {
        realName: "Emma",
        displayName: "Emma",
        avatar: "emma"
      },
      dan: {
        realName: "Dan",
        displayName: "Dan",
        avatar: "dan"
      },
      mark: {
        realName: "Mark",
        displayName: "Mark",
        avatar: "mark"
      }
    };
  }

}
