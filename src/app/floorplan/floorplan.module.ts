import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FloorplanPageRoutingModule } from './floorplan-routing.module';

import { FloorplanPage } from './floorplan.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloorplanPageRoutingModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: FloorplanPage
      }
    ]),
    NgxDatatableModule,
  ],
  declarations: [FloorplanPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FloorplanPageModule {}
