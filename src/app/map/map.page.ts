import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js'




providers: [
  Geolocation,
  NavController,
  SupabaseClient
]
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})

//
//  Test 2  32.8125 -97.3421
//  Test 3  32.7479 -97.2064
//  Database PW: QupUTASummer2021


export class MapPage {

  map: any;
  supabase: SupabaseClient;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  //Array of InfoWindows to display location information
  infoWindows: any = [];

  //Array of Test Markers
  markers: any =[];

  geolocation: Geolocation;
  latitude: any;
  longitude: any;
  platform: Platform;
  dataReturned: any;
  userEmail: any;
  userPhone: any;



  constructor(private route: ActivatedRoute,private router: Router) {
    //Set up the session to be able to query DB in constructor
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //set the data var to be the array of markers passed in
        this.userEmail = this.router.getCurrentNavigation().extras.state.userEmail;
        this.userPhone = this.router.getCurrentNavigation().extras.state.userPhone;
      }
      console.log("THESE ARE THE USER DEETS:")
      console.log(this.userEmail);
      console.log(this.userPhone);
    });

  }


  ionViewDidEnter(){
    //get markers and show map when view is entered
      this.getMarkers()
      this.showMap()
  }


  //Function to convert to Radians
  rad = function(x) {
    return x * Math.PI / 180;
  };


  //Takes 2 longitudes and 2 Latitudes and calcuates the distance between
  getDistance(marker,position){
    //User Coordinates
    let userLat = position.coords.latitude;
    let userLon = position.coords.longitude;
    //Marker Coordinates
    let markerLat = marker.latitude;
    let markerLon = marker.longitude;

    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(userLat - markerLat);
    var dLong = this.rad(userLon - markerLon);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.rad(markerLat)) * Math.cos(this.rad(userLat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = d * .000621; //convert meters into miles
    return d.toPrecision(3); //round off to 3 sigFigs

  }
  //Add markers to the map
  addMarkers(markers,userPosition){
    //Go through all markers in the marker array
    for(let marker of markers){
      //calculate distance from user
      let d = this.getDistance(marker,userPosition);
      //set a position of marker
      let position = new google.maps.LatLng(marker.latitude,marker.longitude);
      //Create the marker, populate its fields in json
      let mapMarker = new google.maps.Marker({
        position: position,
        //label: marker.number,
        label: {
          text:marker.number.toString(),
          color:'black'
        },
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        distance: d
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
      //num = num +1;
    }
  }

  //Function to add the InfoWindow to the map
  addInfoWindowToMarker(marker){
    //Populate the infoWindow in html format
    let infoWindowContent = '<div id="infoWindow">'+
                              '<h2 id="firstHeading" class="firstHeading" style="color:black">'+ marker.title + '</h2>' +
                              '<p style="color:black">Distance: ' + marker.distance + ' miles</p>'+
                              '<ion-button id="book" color="danger">Book Table</ion-button>'+
                             '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    //Click listener to see if user taps on marker
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map,marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('book').addEventListener('click', () => {
          this.router.navigate(['/patron']);

        })
      })
    });
    this.infoWindows.push(infoWindow);
  }

  //Close InfoWindow so that only one is on the map at a time
  closeAllInfoWindows(){
    for ( let window of this.infoWindows){
      window.close();
    }
  }

  async showMap(){

    const position = await Geolocation.getCurrentPosition();
    const latitude =  position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = new google.maps.LatLng(latitude,longitude);

    //Style Functions to turn off all non important
    //default google maps markers and locations
    const myStyles = [{
      featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }];
    const options = {
      center : location,
      zoom : 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      styles: myStyles
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkers(this.markers,position)
  }
  //Use Angulars Navigation module to pass the array of markers
  //to the list view so the Database only need to be queried once

  async openListView() {
    //set up NavExtras as the markers to be pulled by
    //list view page upon entering the view
    let navigationExtras: NavigationExtras = {
      state: {
        markers: this.markers
      }
    };
    //Navigate to the list view passing the marker list
    this.router.navigate(['/list-view'], navigationExtras)
  }

  async getMarkers() {
    //select all the rows from the marker table
    let { data, error } = await this.supabase.from('Markers').select()
    //set up array to put into this.markers
    let markerArray = [];
    let num = 1;
    for (let obj of data)
    {
      //pull the DB cols into an object to store in marker array
      var object = {
        title:obj.locationName,
        latitude:obj.latitude,
        longitude:obj.longitude,
        number:num
      }
      num = num + 1;
      //push DB entry into the marker array
      markerArray.push(object)
    }
    //set the marker array
    this.markers = markerArray;
  }


}
