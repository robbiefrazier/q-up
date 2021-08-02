import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PatronWaitlistPageRoutingModule } from './patron-waitlist-routing.module';

import { PatronWaitlistPage } from './patron-waitlist.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatronWaitlistPageRoutingModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: PatronWaitlistPage
      }
    ]),
    NgxDatatableModule,
  ],
  declarations: [PatronWaitlistPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatronWaitlistPageModule {}
