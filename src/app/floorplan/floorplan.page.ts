import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

export interface Data{
  floorplanTest: string;
}

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.page.html',
  styleUrls: ['./floorplan.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FloorplanPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  floorplanTest: any[];
  constructor(private http: HttpClient){
    this.columns =[
      {name: 'table' },
      {name: 'no. of seat'},
      {name: 'status'}
    ];

    this.http.get<Data>('../../assets/floorplanTest.json')
    .subscribe((res) => {
      console.log(res);
      this.rows = res.floorplanTest;
    });
  }
  ngOnInit() {
    fetch('./assets/floorplanTest.json').then(res => res.json())
    .then(json => {
      this.floorplanTest = json;
  });
}
}
