import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.page.html',
  styleUrls: ['./restaurant-edit.page.scss'],
})
export class RestaurantEditPage implements OnInit {

  restEmail:any;

  constructor(private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //set the data var to be the array of markers passed in
        this.restEmail = this.router.getCurrentNavigation().extras.state.restEmail;
      }
      console.log("THESE ARE THE USER DEETS:")
      console.log(this.restEmail);
    });
  }


  ngOnInit() {
  }


  async goToUnseat()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        restEmail: this.restEmail
      }
    };
    this.router.navigate(['/restaurant-edit-unseat'], navigationExtras)
  }

  async goToSeat()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        restEmail: this.restEmail
      }
    };
    this.router.navigate(['/restaurant-edit-seat'], navigationExtras)
  }
}
