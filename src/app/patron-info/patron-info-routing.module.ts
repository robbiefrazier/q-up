import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatronInfoPage } from './patron-info.page';

const routes: Routes = [
  {
    path: '',
    component: PatronInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatronInfoPageRoutingModule {}
