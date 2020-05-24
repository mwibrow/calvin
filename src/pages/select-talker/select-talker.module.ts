import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SelectTalkerPage } from "./select-talker";
import { ComponentsModule } from "../../components/components.module";
import { InlineSVGModule } from "ng-inline-svg";
@NgModule({
  declarations: [SelectTalkerPage],
  imports: [
    IonicPageModule.forChild(SelectTalkerPage),
    ComponentsModule,
    InlineSVGModule,
  ],
})
export class SelectTalkerPageModule {}
