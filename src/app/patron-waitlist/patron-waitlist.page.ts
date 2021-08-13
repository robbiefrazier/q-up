import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { interval, Subscription, timer} from 'rxjs';
import { ChangeDetectorRef } from '@angular/core'

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
  public mySubscription: Subscription;
  public user:any;
  waitlistTest: any[];

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,private changeRef: ChangeDetectorRef) {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.restId = this.router.getCurrentNavigation().extras.state.restId;
        this.user = this.router.getCurrentNavigation().extras.state.userEmail;
      }
    });

    this.columns = [
      {prop:'name',name: 'Name'},
      {prop:'size',name: 'Size' }
    ];

    this.mySubscription= timer(0,5000).subscribe((x =>{
      this.checkPatronStatus();
  }));

  }

  ngOnInit() {
    this.getList()

  }

  async getList()
  {
    //uses the Id from the DB to pull entries from the waitlist for this location
    let { data, error } = await this.supabase.from('waitList').select().eq('restId',this.restId)
    for( let item in data)
    {
      if(data[item].userEmail == this.user && data[item].seatedOrWaited == "seated")
      {
        this.router.navigate(['/patron-tableready'])
      }

      if(data[item].seatedOrWaited == "waited")
      {
        var jsonData = {};
        //set the DB table row to a json format to be used by ngx-datatable
        jsonData['name'] = data[item].reservationName;
        jsonData['size'] = data[item].partySize.toString();

        this.dbWaitList.waitList.push(jsonData);
      }

    }
    this.rowNum = this.dbWaitList.waitList.length;
    this.rows = [];
    this.rows = this.dbWaitList.waitList;
    this.changeRef.detectChanges();

  }

  async refresh()
  {
    window.location.reload();
  }
  async checkPatronStatus()
  {
    let { data, error } = await this.supabase.from('waitList').select().eq('restId',this.restId)
    for( let item in data)
    {
      if(data[item].userEmail == this.user && data[item].seatedOrWaited == "seated")
      {
        this.router.navigate(['/patron-tableready'])
      }
    }
  }

}
