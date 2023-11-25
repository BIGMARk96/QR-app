import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageErroPageRoutingModule } from './page-erro-routing.module';

import { PageErroPage } from './page-erro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageErroPageRoutingModule
  ],
  declarations: [PageErroPage]
})
export class PageErroPageModule {}
