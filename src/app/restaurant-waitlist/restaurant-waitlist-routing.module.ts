import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantWaitlistPage } from './restaurant-waitlist.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantWaitlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantWaitlistPageRoutingModule {}
