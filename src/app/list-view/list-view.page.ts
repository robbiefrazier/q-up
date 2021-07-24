import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.page.html',
  styleUrls: ['./list-view.page.scss'],
})
export class ListViewPage implements OnInit {

  //create a variable for the markers coming in
  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    //go into the passed params if they exist....
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //set the data var to be the array of markers passed in
        this.data = this.router.getCurrentNavigation().extras.state.markers;
      }
    });
  }





  ngOnInit() {
  }

}
