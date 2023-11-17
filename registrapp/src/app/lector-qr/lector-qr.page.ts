import { Component, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner/public_api';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage implements OnInit {
  scannerEnabled: boolean = true;
  qrResultString: string = "";
  allowedFormats = [BarcodeFormat.QR_CODE];

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  async readFunc(res: string, status: string) {
    if (status === 'success') {
      this.scannerEnabled = false;
      localStorage.setItem('datosqr', res);

      // Obtener la ubicación actual
      const location = await this.getCurrentLocation();

      // Mostrar los datos y la ubicación en la alerta
      const mensaje = `Datos del QR: ${res}\nUbicación: ${location}`;
      this.mostrarAlerta('Datos del QR', mensaje);

      this.router.navigateByUrl('home');
    } else if (res === 'failure') {
      console.log('error, intente nuevamente');
    }
  }

  async getCurrentLocation(): Promise<string> {
    try {
      const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
      const location = `Latitud: ${coordinates.coords.latitude}, Longitud: ${coordinates.coords.longitude}`;
      console.log('Ubicación actual:', location);
      return location;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      return 'Ubicación no disponible';
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Asistencia Tomada',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
