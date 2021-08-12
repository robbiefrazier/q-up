import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantEditPageRoutingModule } from './restaurant-edit-routing.module';

import { RestaurantEditPage } from './restaurant-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantEditPageRoutingModule
  ],
  declarations: [RestaurantEditPage]
})
export class RestaurantEditPageModule {}
