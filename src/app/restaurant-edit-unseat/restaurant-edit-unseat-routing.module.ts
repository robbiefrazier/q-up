import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantEditUnseatPage } from './restaurant-edit-unseat.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantEditUnseatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantEditUnseatPageRoutingModule {}
