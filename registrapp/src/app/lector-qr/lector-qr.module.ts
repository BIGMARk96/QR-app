import { NgModule } from '@angular/core';
<<<<<<< Updated upstream
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorQrPageRoutingModule } from './lector-qr-routing.module';

import { LectorQrPage } from './lector-qr.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorQrPageRoutingModule,
    ZXingScannerModule,
  ],
  declarations: [LectorQrPage]
})
export class LectorQrPageModule {}
=======
import { BrowserModule } from '@angular/platform-browser';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ZXingScannerModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> Stashed changes
