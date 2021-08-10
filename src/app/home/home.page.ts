import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ToastController } from '@ionic/angular';

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
  emailFlag:any;
  constructor(private router: Router,public toastController: ToastController) {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

  }


  async logon()
  {
    let { data, error } = await this.supabase.from('Users').select()
    this.users = data;
    this.emailFlag = 0;
    for(let user of this.users){
      if( this.email == user.email)
      {
        this.emailFlag = 1;
        if(this.pass == user.password)
        {
          let navigationExtras: NavigationExtras = {
            state: {
              userEmail: user.email,
              userPhone: user.phone
            }
          };
          if(user.userType == "restaurant" && user.phone)
          {
            this.router.navigate(['/restaurant-function'],navigationExtras)
          }
          else{
            this.router.navigate(['/restaurant-info'],navigationExtras)
          }
          if(user.userType == "patron" && user.phone)
          {
            this.router.navigate(['/map'],navigationExtras)
          }
          else{
            this.router.navigate(['/patron-info'],navigationExtras)
          }

        }
        else
        {
          this.presentWrongPassToast();
        }
      }
    }
    if(this.emailFlag == 0)
    {
      this.presentWrongEmailToast();
    }

  }
  async presentWrongPassToast() {
    const toast = await this.toastController.create({
      message: 'Email and Password do not match. Try again.',
      duration: 2000
    });
    toast.present();
  }
  async presentWrongEmailToast() {
    const toast = await this.toastController.create({
      message: 'No Account with this email found. Try again.',
      duration: 2000
    });
    toast.present();
  }

}
