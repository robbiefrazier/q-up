import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloorplanPage } from './floorplan.page';

const routes: Routes = [
  {
    path: '',
    component: FloorplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloorplanPageRoutingModule {}
