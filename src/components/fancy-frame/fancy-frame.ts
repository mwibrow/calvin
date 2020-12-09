import { Component, Input } from "@angular/core";

@Component({
  selector: "fancy-frame",
  templateUrl: "fancy-frame.html",
})
export class FancyFrameComponent {
  @Input("color") color: string;
  @Input("square") square: boolean;
  constructor() {
    this.color = "#F57F17";
    this.square = true;
  }

  getSquare(): boolean {
    return this.square;
  }

  setSquare(square: boolean) {
    this.square = square;
  }

  getColor(): string {
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
  }
}
