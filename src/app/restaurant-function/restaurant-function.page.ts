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

  //function to nav to waitlist with info needed for DB
  async showWait()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        restEmail: this.userEmail
      }
    };
    //Navigate to the waitlist
    this.router.navigate(['/restaurant-waitlist'], navigationExtras)
  }

  //function to nav to floor plan with info needed for DB
  async showFloorPlan()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        restEmail: this.userEmail
      }
    };
    //Navigate to the floor plan
    this.router.navigate(['/floorplan'], navigationExtras)
  }

  //function to nav to info with info needed for DB
  async showInfo()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        restEmail: this.userEmail
      }
    };
    //Navigate to the info
    this.router.navigate(['/restaurant-info'], navigationExtras)
  }
}

