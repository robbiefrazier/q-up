import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatronWaitlistPage } from './patron-waitlist.page';

const routes: Routes = [
  {
    path: '',
    component: PatronWaitlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatronWaitlistPageRoutingModule {}
