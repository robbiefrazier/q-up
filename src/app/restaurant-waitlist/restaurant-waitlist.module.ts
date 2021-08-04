import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RestaurantWaitlistPageRoutingModule } from './restaurant-waitlist-routing.module';
import { RestaurantWaitlistPage } from './restaurant-waitlist.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantWaitlistPageRoutingModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: RestaurantWaitlistPage
      }
    ]),
    NgxDatatableModule,

  ],
  declarations: [RestaurantWaitlistPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantWaitlistPageModule {}
