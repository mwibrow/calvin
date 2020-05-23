import { Directive, Input } from "@angular/core";

import { VocalTractAnimationComponent } from "./vocal-tract-animation";

@Directive({
  selector: "[animation]", // Attribute selector
})
export class AnimationDirective {
  @Input("animation") public animation: string;
  constructor(public vocalTractAnimation: VocalTractAnimationComponent) {}

  ngOnInit() {
    this.vocalTractAnimation.setAnimation(this.animation);
  }
}
