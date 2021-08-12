import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantEditSeatPageRoutingModule } from './restaurant-edit-seat-routing.module';

import { RestaurantEditSeatPage } from './restaurant-edit-seat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantEditSeatPageRoutingModule
  ],
  declarations: [RestaurantEditSeatPage]
})
export class RestaurantEditSeatPageModule {}
