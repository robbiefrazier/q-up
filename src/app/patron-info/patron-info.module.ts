import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatronInfoPageRoutingModule } from './patron-info-routing.module';

import { PatronInfoPage } from './patron-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatronInfoPageRoutingModule
  ],
  declarations: [PatronInfoPage]
})
export class PatronInfoPageModule {}
