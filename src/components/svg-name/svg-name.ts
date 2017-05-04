import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Directive({
  selector: '[svg-name]', // Attribute selector
  providers: [HttpModule]
})
export class SvgName {

  @Input('svg-name') svgName;

  constructor(public element: ElementRef, public http: Http) {}

  ngOnInit(){
    console.log(this.svgName)
    this.loadSvg('/assets/images/svg/calvin-' + this.svgName + '.svg');
  }

  loadSvg(path: string)
   {
     var that = this;
      this.http
        .get(path)
        .map(res => res.text())
        .subscribe((data)=>
          {
            that.element.nativeElement.innerHTML = data
          });
   }
}
