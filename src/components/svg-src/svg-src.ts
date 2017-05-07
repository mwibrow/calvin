import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Directive({
  selector: '[svg-src]', // Attribute selector
  providers: [HttpModule]
})
export class SvgSrc {

  @Input('svg-src') svgSrc: string;
  constructor(public element: ElementRef, public http: Http) {}

  ngOnInit(){

    this.loadSvg(this.svgSrc);
  }

  loadSvg(src: string){
    var that: SvgSrc = this;
    if (!src.endsWith('.svg')) {
      src += '.svg';
    }
    this.http
      .get(src)
      .map(res => res.text())
      .subscribe((data)=>
        {
          that.element.nativeElement.innerHTML = data;
        });
   }
}
