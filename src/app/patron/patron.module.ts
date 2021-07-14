import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatronPageRoutingModule } from './patron-routing.module';

import { PatronPage } from './patron.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatronPageRoutingModule
  ],
  declarations: [PatronPage]
})
export class PatronPageModule {}
