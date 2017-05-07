import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  constructor(public navCtrl: NavController) {


  }

  ngOnInit() {
    // let input = this.vocalTract.nativeElement.querySelector('svg');
    // console.log(input)

}

  ionViewDidLoad() {

  };

}
