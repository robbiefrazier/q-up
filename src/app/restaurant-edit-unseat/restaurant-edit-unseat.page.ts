import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-edit-unseat',
  templateUrl: './restaurant-edit-unseat.page.html',
  styleUrls: ['./restaurant-edit-unseat.page.scss'],
})
export class RestaurantEditUnseatPage implements OnInit {

  table:any;
  restEmail:any;
  userEmail:any;
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

  async getID()
  {
    //pulls the restID from the Db for the location based on account email
    let { data, error } = await this.supabase.from('Restaurants').select().eq('email',this.restEmail).single()
    this.restId = data.restId;
  }

  async getTableEmail(){
    //get all the people in the waitlist for the location
    let { data, error } = await this.supabase.from('waitList').select().eq('restId',this.restId)
    this.userEmail = "NOTFOUND";
    for( let item in data)
    {
      if(data[item].tableNumber == this.table)
      {
        this.userEmail = data[item].userEmail;
        this.partySize = data[item].partySize;
      }
    }

    if(this.userEmail == "NOTFOUND")
    {
      this.presentNotFoundToast()
      //this.navToFunctions()
    }
    else
    {
      this.updateRestTableNum();
      this.clearTableDB();
      this.presentTableClearedToast();
      this.navToFunctions();
    }
  }

    //notification user wasnt found
    async presentNotFoundToast() {
      const toast = await this.toastController.create({
        message: 'No one found sitting at that table.',
        duration: 2000
      });
      toast.present();
    }

    //notification user wasnt found
    async presentTableClearedToast() {
      const toast = await this.toastController.create({
        message: 'Table clear and ready for next guest.',
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

    async clearTableDB()
    {
      const { data, error } = await this.supabase
      .from('waitList')
      .delete()
      .match({ userEmail: this.userEmail })
    }

    async updateTwoTables()
    {
      const { data, error } = await this.supabase
      .from('Restaurants')
      .update({availableTwoTables:(this.numToUpdateInRestTable+1)})
      .eq('restId', this.restId)

    }

    async updateFourTables()
    {
      const { data, error } = await this.supabase
      .from('Restaurants')
      .update({availableFourTables:(this.numToUpdateInRestTable+1)})
      .eq('restId', this.restId)

    }

    async updateSixTables()
    {
      const { data, error } = await this.supabase
      .from('Restaurants')
      .update({availableSixTables:(this.numToUpdateInRestTable+1)})
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
