import { Component, Input, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "heading",
  templateUrl: "heading.html",
})
export class HeadingComponent {
  @Input("color") color: string;
  @ViewChild("path") path: ElementRef;
  constructor() {
    this.color = "#03A9F4";
  }

  getColor() {
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
  }
}
