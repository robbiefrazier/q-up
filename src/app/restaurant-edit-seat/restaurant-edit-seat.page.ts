import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-edit-seat',
  templateUrl: './restaurant-edit-seat.page.html',
  styleUrls: ['./restaurant-edit-seat.page.scss'],
})
export class RestaurantEditSeatPage implements OnInit {

  name:any;
  phone:any;
  table:any;
  restEmail:any;
  patronEmail:any;
  restId:any;
  partySize:any;
  numToUpdateInRestTable:any;
  supabase: SupabaseClient;

  constructor(private route: ActivatedRoute,private router: Router,public toastController: ToastController) {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

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
    this.getID();
  }

  async seatPatron()
  {
    this.getPatronEmail();
  }

  async getID()
  {
    //pulls the restID from the Db for the location based on account email
    let { data, error } = await this.supabase.from('Restaurants').select().eq('email',this.restEmail).single()
    this.restId = data.restId;
  }

  async getPatronEmail(){
    //get all the people in the waitlist for the location
    let { data, error } = await this.supabase.from('waitList').select().eq('restId',this.restId)
    this.patronEmail = "NOTFOUND";
    //go through all the people on waitlist
    for( let item in data)
    {
      //select the email of the one with matching info given to staff
      if(data[item].reservationName == this.name && data[item].userPhone == this.phone)
      {
        this.patronEmail = data[item].userEmail;
        this.partySize = data[item].partySize;
      }

    }
    //person was not found on the waitlist default val still held
    if(this.patronEmail == "NOTFOUND")
    {
      this.presentNotFoundToast()
      this.navToFunctions()
    }
    else{
      this.updatePatronStatus();
      this.updateRestTableNum();
    }
  }

  async updatePatronStatus()
  {
    const { data, error } = await this.supabase
    .from('waitList')
    .update({seatedOrWaited:"seated",tableNumber:this.table})
    .eq('userEmail', this.patronEmail)

    this.presentUpdatedToast();
    this.navToFunctions();

  }
  //notification user wasnt found
  async presentNotFoundToast() {
    const toast = await this.toastController.create({
      message: 'Patron not on Wait List. Please Check Again.',
      duration: 2000
    });
    toast.present();
  }
  //notification user was found and table set
  async presentUpdatedToast() {
    const toast = await this.toastController.create({
      message: 'Patron has been checked in.',
      duration: 2000
    });
    toast.present();
  }
  //function to go back to resturaunts main function page
  async navToFunctions()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        userEmail: this.restEmail,
      }
    }
    this.router.navigate(['/restaurant-function'],navigationExtras);
  }

  async updateTwoTables()
  {
    const { data, error } = await this.supabase
    .from('Restaurants')
    .update({availableTwoTables:(this.numToUpdateInRestTable-1)})
    .eq('restId', this.restId)

  }

  async updateFourTables()
  {
    const { data, error } = await this.supabase
    .from('Restaurants')
    .update({availableFourTables:(this.numToUpdateInRestTable-1)})
    .eq('restId', this.restId)

  }

  async updateSixTables()
  {
    const { data, error } = await this.supabase
    .from('Restaurants')
    .update({availableSixTables:(this.numToUpdateInRestTable-1)})
    .eq('restId', this.restId)

  }

  async updateRestTableNum()
  {
    let { data, error } = await this.supabase.from('Restaurants').select().eq('restId',this.restId)

    //select a 2 person table for 2 or less guests
    if(this.partySize > 0 && this.partySize <= 2)
    {
      this.numToUpdateInRestTable = data[0].availableTwoTables;
      this.updateTwoTables();

    //select a 4 person table for 3-4 guests
    if(this.partySize > 2 && this.partySize <= 4)
    {
      this.numToUpdateInRestTable = data[0].availableFourTables;
      this.updateFourTables();
    }
    //select a 6 person table for 5-6 guests
    if(this.partySize > 4 && this.partySize <= 6)
    {
      this.numToUpdateInRestTable = data[0].availableSixTables;
      this.updateSixTables();
    }

  }

}

}
