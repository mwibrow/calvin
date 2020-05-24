import { Component } from "@angular/core";
import { IonicPage, App, NavController } from "ionic-angular";
import { AppDataProvider, Talker } from "../../providers/app-data/app-data";
import { SelectKeywordGroupPage } from "../select-keyword-group/select-keyword-group";

import * as mdColors from "material-colors";

@IonicPage()
@Component({
  selector: "page-select-talker",
  templateUrl: "select-talker.html",
})
export class SelectTalkerPage {
  constructor(
    public appData: AppDataProvider,
    public navCtrl: NavController,
    public app: App
  ) {}

  getBackgroundColor() {
    return mdColors && mdColors.yellow ? mdColors.yellow[500] : "yellow";
  }

  ionViewDidLoad() {
    this.app.setTitle("CALVin");
  }

  setTalker(talker: Talker) {
    this.appData.setTalker(talker);
    this.navCtrl.push(SelectKeywordGroupPage);
  }

  isTalker(talker: Talker) {
    return this.appData.talker && this.appData.talker.id === talker.id;
  }

  getTalkers() {
    let talkers = this.appData.config.words.talkers.map(
      (id) => this.appData.talkers[id]
    );
    return talkers;
  }

  goBack() {
    this.navCtrl.pop();
  }
}
