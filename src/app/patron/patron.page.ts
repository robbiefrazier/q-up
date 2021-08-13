import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-patron',
  templateUrl: './patron.page.html',
  styleUrls: ['./patron.page.scss'],
})
export class PatronPage implements OnInit {
  currentNumber: any;
  userEmail:any;
  userPhone:any;
  restName:any;
  restId:any;
  name:any;
  numToUpdateInRestTable:any;
  supabase: SupabaseClient;
  seatOrWait:any;

  constructor(private route: ActivatedRoute,private router: Router,public toastController: ToastController){
    this.currentNumber=1;

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //Get user email, phone and location selection from Map page
        this.userEmail = this.router.getCurrentNavigation().extras.state.userEmail;
        this.userPhone = this.router.getCurrentNavigation().extras.state.userPhone;
        this.restName = this.router.getCurrentNavigation().extras.state.marker;
      }
    });
  }
  increment() {
    if(this.currentNumber<6){
      this.currentNumber += 1;
      console.log(this.currentNumber);
    }
    //if the user tries to make a table reservation for more than 6 people
    else
    {
      //present them with a message alerting them
      this.presentToast();
    }
  }
  decrement() {
    if(this.currentNumber>1){
        this.currentNumber -= 1;
        console.log(this.currentNumber);}
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tables larger than 6 are not supported. Please contact the location for large table options.',
      duration: 2000
    });
    toast.present();
  }

  async presentWaitedToast() {
    const toast = await this.toastController.create({
      message: 'These are the other guest infront of you. You will be alerted when your table is ready!',
      duration: 7000
    });
    toast.present();
  }

  async sendToWait()
  {
    let navExtra: NavigationExtras = {
      state: {
        restId: this.restId,
        userEmail: this.userEmail
      }
    };
    this.presentWaitedToast();
    this.router.navigate(['/patron-waitlist'],navExtra)
  }

  async sendToSeat()
  {
    //Check for the table they requested
    this.router.navigate(['/patron-tableready'])
  }

  async logUser()
  {
    const { data, error } = await this.supabase
    .from('waitList')
    .insert([
    { userEmail : this.userEmail, userPhone : this.userPhone, partySize : this.currentNumber, seatedOrWaited : this.seatOrWait, restId:this.restId,reservationName:this.name}
    ])
  }

  async getRestId()
  {
    //Get the Restauraunt Id based on the name passed in
    let { data, error } = await this.supabase.from('Restaurants').select().eq('locationName',this.restName).single()
    this.restId = data.restId;
  }

  async checkForTable()
  {
    this.updateTable()
  }

  async updateTable()
  {
    //set user default to waited
    this.seatOrWait = "waited"
    //select the restauraunt from the DB based on the ID
    let { data, error } = await this.supabase.from('Restaurants').select().eq('restId',this.restId)

    //select a 2 person table for 2 or less guests
    if(this.currentNumber > 0 && this.currentNumber <= 2)
    {
     this.numToUpdateInRestTable = data[0].availableTwoTables;
     //The location has an open table so seat the user and log their info
     if(this.numToUpdateInRestTable != 0)
     {
       this.seatOrWait = "seated";
       this.updateTwoTables();
       this.logUser();
       this.sendToSeat();
     }
     //No open tables of user selection set user to waiting and queue them
     if(this.numToUpdateInRestTable == 0)
     {
      this.seatOrWait = "waited";
      this.logUser();
      this.sendToWait();
     }
    }
    //select a 4 person table for 3-4 guests
    if(this.currentNumber > 2 && this.currentNumber <= 4)
    {
      this.numToUpdateInRestTable = data[0].availableFourTables;
      //The location has an open table so seat the user and log their info
      if(this.numToUpdateInRestTable != 0)
      {
        this.seatOrWait = "seated";
        this.updateFourTables();
        this.logUser();
        this.sendToSeat();
      }
      //No open tables of user selection set user to waiting and queue them
      else
      {
        this.seatOrWait = "waited";
        this.logUser();
        this.sendToWait();
      }
    }
    //select a 6 person table for 5-6 guests
    if(this.currentNumber > 4 && this.currentNumber <= 6)
    {
      this.numToUpdateInRestTable = data[0].availableSixTables;
      //The location has an open table so seat the user and log their info
      if(this.numToUpdateInRestTable != 0)
      {
        this.seatOrWait = "seated";
        this.updateSixTables();
        this.logUser();
        this.sendToSeat();
      }
      //No open tables of user selection set user to waiting and queue them
      else
      {
        this.seatOrWait = "waited";
        this.logUser();
        this.sendToWait();
      }
    }
    //No tables of this qunatity are supported
    if(this.currentNumber > 6)
    {
      console.log("Parties this large are not currently supported here.");
    }

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

  ngOnInit() {
    this.getRestId();
  }

}
