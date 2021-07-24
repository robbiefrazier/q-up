import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatronPage } from './patron.page';

const routes: Routes = [
  {
    path: '',
    component: PatronPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatronPageRoutingModule {}
