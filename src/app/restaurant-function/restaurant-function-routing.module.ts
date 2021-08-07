import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantFunctionPage } from './restaurant-function.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantFunctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantFunctionPageRoutingModule {}
