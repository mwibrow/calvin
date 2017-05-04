import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SvgName directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[svgname]', // Attribute selector
  providers: [HttpModule]
})
export class SvgName {

  @Input('svgname') svgName;

  svgData: string;
  constructor(public element: ElementRef, public http: Http) {
    console.log('Hello SvgName Directive');

    element.nativeElement.innerHTML = 'foo';

  }

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
          // this.svgData = data;
          });
   }


}
