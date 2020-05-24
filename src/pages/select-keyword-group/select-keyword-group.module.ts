import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SelectKeywordGroupPage } from "./select-keyword-group";
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [SelectKeywordGroupPage],
  imports: [IonicPageModule.forChild(SelectKeywordGroupPage), ComponentsModule],
})
export class SelectKeywordGroupPageModule {}
