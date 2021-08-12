import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantEditUnseatPageRoutingModule } from './restaurant-edit-unseat-routing.module';

import { RestaurantEditUnseatPage } from './restaurant-edit-unseat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantEditUnseatPageRoutingModule
  ],
  declarations: [RestaurantEditUnseatPage]
})
export class RestaurantEditUnseatPageModule {}
