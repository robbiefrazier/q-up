import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatronTablereadyPageRoutingModule } from './patron-tableready-routing.module';

import { PatronTablereadyPage } from './patron-tableready.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatronTablereadyPageRoutingModule
  ],
  declarations: [PatronTablereadyPage]
})
export class PatronTablereadyPageModule {}
