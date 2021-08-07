import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-restaurant-function',
  templateUrl: './restaurant-function.page.html',
  styleUrls: ['./restaurant-function.page.scss'],
})
export class RestaurantFunctionPage   {

  userEmail: any;
  userPhone: any;

  constructor(private route: ActivatedRoute,private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //set the data var to be the array of markers passed in
        this.userEmail = this.router.getCurrentNavigation().extras.state.userEmail;
        this.userPhone = this.router.getCurrentNavigation().extras.state.userPhone;
      }
      console.log("THESE ARE THE USER DEETS:")
      console.log(this.userEmail);
      console.log(this.userPhone);
    });
  }


  async showWait()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        restEmail: this.userEmail
      }
    };
    //Navigate to the list view passing the marker list
    this.router.navigate(['/restaurant-waitlist'], navigationExtras)
  }
}

