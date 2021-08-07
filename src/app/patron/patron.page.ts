import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-patron',
  templateUrl: './patron.page.html',
  styleUrls: ['./patron.page.scss'],
})
export class PatronPage implements OnInit {
  currentNumber: any;

  constructor(private router: Router){this.currentNumber=1;}
  increment() {
    this.currentNumber += 1;
    console.log(this.currentNumber);
  }
  decrement() {
    if(this.currentNumber>1){
        this.currentNumber -= 1;
        console.log(this.currentNumber);}
  }
  async sendToWait()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        partSize: this.currentNumber
      }
    };
    //Navigate to the list view passing the marker list
    this.router.navigate(['/patron-waitlist'], navigationExtras)
  }

  ngOnInit() {
  }

}
