import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SelectKeywordPage } from "./select-keyword";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [SelectKeywordPage],
  imports: [IonicPageModule.forChild(SelectKeywordPage), ComponentsModule],
})
export class SelectKeywordPageModule {}
