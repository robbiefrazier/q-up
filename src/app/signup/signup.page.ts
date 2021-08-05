import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  radioGroupChange(event) {
    console.log('radioGroupChange',event.detail);
    this.selectedRadioGroup = event.detail;
  }
  signUp(){
    if(this.selectedRadioGroup.value === 'patron'){
      this.router.navigate(['/patron-info']);
    }
    else{
      this.router.navigate(['/restaurant-info']);
    }
  }
}
