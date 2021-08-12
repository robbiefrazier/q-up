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
  selector: 'app-patron-waitlist',
  templateUrl: './patron-waitlist.page.html',
  styleUrls: ['./patron-waitlist.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatronWaitlistPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  public restId:any;
  public supabase: SupabaseClient;
  public rowNum: any;
  public dbWaitList={waitList:[]};
  waitlistTest: any[];

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.restId = this.router.getCurrentNavigation().extras.state.restId;
      }
    });

    this.columns = [
      {prop:'name',name: 'Name'},
      //{prop:'phone',name: 'Phone'},
      {prop:'size',name: 'Size' }
    ];

    //this.http.get<Data>('../../assets/waitlistTest.json')
    //  .subscribe((res) => {
    //    console.log(res);
    //    this.rows = res.waitlistTest;
    //  });
  }

  ngOnInit() {
    this.getList()
    //fetch('./assets/waitlistTest.json').then(res => res.json())
    //  .then(json => {
    //    this.waitlistTest = json;
    //  });
  }

  async getList()
  {
    //uses the Id from the DB to pull entries from the waitlist for this location
    let { data, error } = await this.supabase.from('waitList').select().eq('restId',this.restId)
    for( let item in data)
    {
      if(data[item].seatedOrWaited == "waited")
      {
        var jsonData = {};
        //set the DB table row to a json format to be used by ngx-datatable
        jsonData['name'] = data[item].reservationName
        //jsonData['phone'] = data[item].userPhone.toString()
        jsonData['size'] = data[item].partySize.toString()

        this.dbWaitList.waitList.push(jsonData);
      }

    }
    this.rowNum = this.dbWaitList.waitList.length;
    this.rows = this.dbWaitList.waitList;

  }

}
