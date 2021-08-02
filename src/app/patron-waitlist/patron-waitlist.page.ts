import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

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
  waitlistTest: any[];
  constructor(private http: HttpClient) {
    this.columns = [
      { name: 'name' },
      { name: 'size' },
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
