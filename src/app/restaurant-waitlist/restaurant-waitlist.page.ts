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
  public dbWaitList={waitList:[]};
  public rowNum: any;
  waitlistTest: any[];
  supabase: SupabaseClient;

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.columns = [
      {prop:'email',name: 'Email'},
      {prop:'phone',name: 'Phone'},
      {prop:'size',name: 'Size' },
      {prop:'time',name: 'Time' }
    ];

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userEmail = this.router.getCurrentNavigation().extras.state.restEmail;
      }
      //this.getID();
    });
}

  ngOnInit() {
    this.getID()
    fetch('./assets/waitlistTest.json').then(res => res.json())
    .then(json => {
      this.waitlistTest = json;
    });
  }

  async getID()
  {
    //pulls the restID from the Db for the location based on account email
    let { data, error } = await this.supabase.from('Restaurants').select().eq('email',this.userEmail).single()
    this.restId = data.restId;
    this.getList();
  }

  async getList()
  {
    //uses the Id from the DB to pull entries from the waitlist for this location
    let { data, error } = await this.supabase.from('waitList').select().eq('restId',this.restId)
    for( let item in data)
    {
      var jsonData = {};
      //set the DB table row to a json format to be used by ngx-datatable
      jsonData['email'] = data[item].userEmail
      jsonData['phone'] = data[item].userPhone.toString()
      jsonData['size'] = data[item].partySize.toString()
      jsonData['time'] = data[item].timeStartWaitedOrSeated

      this.dbWaitList.waitList.push(jsonData);
    }
    this.rowNum = data.length;
    this.rows = this.dbWaitList.waitList;

  }

}
