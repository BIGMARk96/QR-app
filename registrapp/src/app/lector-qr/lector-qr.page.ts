import { Component, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner/public_api';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage implements OnInit {
  
  scannerEnabled: boolean = true;
  qrResultString: string = "";
  allowedFormats = [ BarcodeFormat.QR_CODE ];
  

  constructor(private router: Router, private alertController: AlertController) { }
  
  ngOnInit() {
  }

  readFunc(res: string, status: string) {
    if (status === 'success') {
      this.scannerEnabled = false;
      localStorage.setItem('datosqr', res);
      
      this.mostrarAlerta('Datos del QR', res);
      
      this.router.navigateByUrl('home');
  
      
    } else if (res === 'failure') {
      console.log('error, intente nuevamente');
    }
  }
  
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Asistencia Tomada',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}