import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  supabase: SupabaseClient;
  users = [];
  email: string;
  pass: string;
  constructor(private router: Router) {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

  }


  async logon()
  {
    //console.log((this.email));
    //console.log((this.pass));
    let { data, error } = await this.supabase.from('Users').select()
    this.users = data;
    for(let user of this.users){
      if( this.email == user.email)
      {
        if(this.pass == user.password)
        {
          let navigationExtras: NavigationExtras = {
            state: {
              userEmail: user.email,
              userPhone: user.phone
            }
          };
          if(user.userType == "restaurant")
          {
            this.router.navigate(['/restaurant-waitlist'],navigationExtras)
          }
          if(user.userType == "patron")
          {
            this.router.navigate(['/map'],navigationExtras)
          }

        }
      }
    }

  }

}
