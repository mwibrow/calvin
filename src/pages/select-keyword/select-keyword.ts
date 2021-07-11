import { Component, ViewChildren, QueryList } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import {
  AppDataProvider,
  WordGroup,
  Word,
  WordTypes,
} from "../../providers/app-data/app-data";
import { AudioProvider, AudioPlayer } from "../../providers/audio/audio";
import { VowelTrainerPage } from "../../pages/vowel-trainer/vowel-trainer";
import { KeywordComponent } from "../../components/keyword/keyword";
import * as mdColors from "material-colors";
/**
 * Generated class for the SelectKeywordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-select-keyword",
  templateUrl: "select-keyword.html",
})
export class SelectKeywordPage {
  backgroundColor: string = mdColors.yellow[500];
  player: AudioPlayer;
  selectedKeyword: string;
  @ViewChildren("keywordComponentList") keywordComponentList: QueryList<
    KeywordComponent
  >;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppDataProvider,
    public audio: AudioProvider
  ) {
    this.player = this.audio.player;
    this.selectedKeyword = null;
  }

  ngAfterViewInit() {
    this.player.initialise();
    this.selectedKeyword = null;
  }

  ionViewDidLoad() {
    this.keywordComponentList
      .toArray()
      .map(
        (keywordComponent) =>
          (keywordComponent.siblings = this.keywordComponentList.toArray())
      );
    this.selectedKeyword = null;
  }
  ionViewWillEnter() {
    this.keywordComponentList
      .toArray()
      .map((keywordComponent) => (keywordComponent.selected = false));
    this.selectedKeyword = null;
  }

  getBackgroundColor() {
    return this.backgroundColor;
  }
  getKeywordList() {
    return this.appData.getKeywordGroup().words;
  }

  getKeyword(keyword: string) {
    return this.appData.keywords[keyword];
  }

  setKeyword(keyword: string) {
    this.selectedKeyword = keyword;
    if (this.player.playing()) {
      return;
    }
    this.appData.keywordIndex = this.appData.keywordList.indexOf(keyword);
    this.navCtrl.push(VowelTrainerPage);
  }

  playKeyword(keyword: string) {

    this.selectedKeyword = keyword;
    let uri = this.appData.getAudioUri(
      this.appData.talker.id,
      keyword,
      WordTypes.Keywords
    );
    this.player
      .playUrl(uri)
      .then(() => {
        if (this.selectedKeyword === keyword) {
          this.setKeyword(keyword);
        }
      })
      // tslint:disable-next-line: no-empty
      .catch(() => { });
  }

  goBack() {
    this.navCtrl.pop();
  }

  goForward() {
    this.navCtrl.push(VowelTrainerPage);
  }

  canGoForward() {
    return (
      this.keywordComponentList &&
      this.keywordComponentList.some(
        (keywordComponent) => keywordComponent.selected
      )
    );
  }

  getKeywordAudioUri(keyword: string) {
    let uri: string = this.appData.getAudioUri(
      null,
      keyword,
      WordTypes.Keywords
    );
    return uri;
  }

  getKeywordImageUri(keyword: string) {
    let uri: string = this.appData.getImageUri(keyword, WordTypes.Keywords);
    return uri;
  }
}
