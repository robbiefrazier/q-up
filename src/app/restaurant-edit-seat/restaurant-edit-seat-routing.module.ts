import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantEditSeatPage } from './restaurant-edit-seat.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantEditSeatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantEditSeatPageRoutingModule {}
