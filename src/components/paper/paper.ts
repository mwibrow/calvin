import { Component, Input } from "@angular/core";

import * as mdColors from "material-colors";

/**
 * Generated class for the PaperComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "paper",
  templateUrl: "paper.html",
})
export class PaperComponent {
  @Input("color") color: string = mdColors.yellow[500];
  @Input("pattern") pattern: string = "circles";
}
