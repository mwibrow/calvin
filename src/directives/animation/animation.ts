import { Directive, ElementRef, Input } from '@angular/core';
import { VocalTractAnimationComponent } from '../../components/vocal-tract-animation/vocal-tract-animation';
@Directive({
  selector: '[animation]' // Attribute selector
})
export class AnimationDirective {

  @Input('animation') animation: string;
  constructor(public vocalTractAnimation: VocalTractAnimationComponent) {}

  ngOnInit(){
    this.vocalTractAnimation.setAnimation(this.animation);
  }

}
