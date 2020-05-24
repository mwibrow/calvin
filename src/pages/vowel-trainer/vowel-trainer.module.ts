import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { VowelTrainerPage } from "./vowel-trainer";

import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [VowelTrainerPage],
  imports: [IonicPageModule.forChild(VowelTrainerPage), ComponentsModule],
})
export class VowelTrainerPageModule {}
