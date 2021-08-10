import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

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
  numToUpdateInRestTable:any;
  supabase: SupabaseClient;
  seatOrWait:any;

  constructor(private route: ActivatedRoute,private router: Router){
    this.currentNumber=1;

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //set the data var to be the array of markers passed in
        this.userEmail = this.router.getCurrentNavigation().extras.state.userEmail;
        this.userPhone = this.router.getCurrentNavigation().extras.state.userPhone;
        this.restName = this.router.getCurrentNavigation().extras.state.marker;
      }
      //console.log("THESE ARE THE USER DEETS:")
      //console.log(this.userEmail);
      //console.log(this.userPhone);
      //console.log(this.restName);
    });
  }
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
    this.checkForTable()
    //this.logUser()
    this.router.navigate(['/patron-waitlist'])
  }
  async logUser()
  {
    const { data, error } = await this.supabase
    .from('waitList')
    .insert([
    { userEmail : this.userEmail, userPhone : this.userPhone, partySize : this.currentNumber, seatedOrWaited : this.seatOrWait, restId:this.restId}
    ])
  }

  async getRestId()
  {
    let { data, error } = await this.supabase.from('Restaurants').select().eq('locationName',this.restName).single()
    this.restId = data.restId;
    //console.log("THIS IS THE REST ID");
    //console.log(this.restId);
  }

  async checkForTable()
  {
    this.updateTable()
  }

  async updateTable()
  {
    this.seatOrWait = "waited"
    let { data, error } = await this.supabase.from('Restaurants').select().eq('restId',this.restId)
    //console.log("AVALABNLE TABLES")
    //console.log(data[0].tableVar)

    if(this.currentNumber > 0 && this.currentNumber <= 2)
    {
     //console.log(data[0].availableTwoTables);
     this.numToUpdateInRestTable = data[0].availableTwoTables;
     if(this.numToUpdateInRestTable != 0)
     {
       this.seatOrWait = "seated";
       this.updateTwoTables();
       this.logUser()
     }
     if(this.numToUpdateInRestTable == 0)
     {
      this.seatOrWait = "waited";
      this.logUser()
     }
    }
    if(this.currentNumber > 2 && this.currentNumber <= 4)
    {
      //console.log(data[0].availableFourTables);
      this.numToUpdateInRestTable = data[0].availableFourTables;
      if(this.numToUpdateInRestTable != 0)
      {
        this.seatOrWait = "seated";
        this.updateFourTables();
        this.logUser()
      }
      else
      {
        this.seatOrWait = "waited";
        this.logUser()
      }
    }
    if(this.currentNumber > 4 && this.currentNumber <= 6)
    {
      //console.log(data[0].availableSixTables);
      this.numToUpdateInRestTable = data[0].availableSixTables;
      if(this.numToUpdateInRestTable != 0)
      {
        this.seatOrWait = "seated";
        this.updateSixTables();
        this.logUser()
      }
      else
      {
        this.seatOrWait = "waited";
        this.logUser()
      }
    }
    if(this.currentNumber > 6)
    {
      console.log("Parties this large are nto currently supported here.");
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
