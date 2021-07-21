import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patron',
  templateUrl: './patron.page.html',
  styleUrls: ['./patron.page.scss'],
})
export class PatronPage implements OnInit {
  currentNumber: any;

  constructor(){this.currentNumber=1;}
  increment() {
    this.currentNumber += 1;
    console.log(this.currentNumber + 1);
  }
  decrement() {
    if(this.currentNumber>1){
        this.currentNumber -= 1;
        console.log(this.currentNumber - 1);}
  }

  ngOnInit() {
  }

}
