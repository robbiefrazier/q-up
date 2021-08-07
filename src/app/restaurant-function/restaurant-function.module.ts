import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantFunctionPageRoutingModule } from './restaurant-function-routing.module';

import { RestaurantFunctionPage } from './restaurant-function.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantFunctionPageRoutingModule
  ],
  declarations: [RestaurantFunctionPage]
})
export class RestaurantFunctionPageModule {}
