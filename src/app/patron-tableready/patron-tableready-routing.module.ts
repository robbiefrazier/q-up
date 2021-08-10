import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatronTablereadyPage } from './patron-tableready.page';

const routes: Routes = [
  {
    path: '',
    component: PatronTablereadyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatronTablereadyPageRoutingModule {}
