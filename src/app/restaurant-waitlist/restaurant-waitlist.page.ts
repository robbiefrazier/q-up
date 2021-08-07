import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Data {
  waitlistTest: string;
}

@Component({
  selector: 'app-restaurant-waitlist',
  templateUrl: './restaurant-waitlist.page.html',
  styleUrls: ['./restaurant-waitlist.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RestaurantWaitlistPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  public userEmail: any;
  public restId:any;
  public dbWaitList:any[];
  waitlistTest: any[];
  supabase: SupabaseClient;

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.columns = [
      {name: 'position'},
      { name: 'name' },
      { name: 'size' },
      {name:  'phone'},
      { name: 'time' }
    ];
    this.http.get<Data>('../../assets/waitlistTest.json')
    .subscribe((res) => {
      console.log(res);
      this.rows = res.waitlistTest;
    });




    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //set the data var to be the array of markers passed in
        this.userEmail = this.router.getCurrentNavigation().extras.state.restEmail;
      }
      this.getID();
    });
}

  ngOnInit() {
    fetch('./assets/waitlistTest.json').then(res => res.json())
    .then(json => {
      this.waitlistTest = json;
    });
  }

  async getID()
  {
    let { data, error } = await this.supabase.from('Restaurants').select().eq('email',this.userEmail).single()
    this.restId = data.restId;
    this.getList();
  }

  async getList()
  {
    let { data, error } = await this.supabase.from('waitList').select().eq('restId',this.restId)
    this.dbWaitList = data;
    console.log(this.dbWaitList)
  }

}
