import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ExampleWordPage } from "./example-word";

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ExampleWordPage],
  imports: [IonicPageModule.forChild(ExampleWordPage), ComponentsModule],
})
export class ExampleWordPageModule {}
