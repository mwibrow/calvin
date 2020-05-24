import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { ComponentsModule } from "../../components/components.module";
import { InlineSVGModule } from "ng-inline-svg";
@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule,
    InlineSVGModule,
  ],
})
export class HomePageModule {}
