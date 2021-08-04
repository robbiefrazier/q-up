import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

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
  waitlistTest: any[];

  constructor(private http: HttpClient) {
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
}

  ngOnInit() {
    fetch('./assets/waitlistTest.json').then(res => res.json())
    .then(json => {
      this.waitlistTest = json;
    });
  }

}
