import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = "";
  carreraUsuario: string = "";
  alertController: any;
  authService: any;

  async obtenerDatosUsuario() {
    const usuario = await this.authService.obtenerUsuarioActual();
    if (usuario) {
      this.nombreUsuario = usuario.nombre;
      this.carreraUsuario = usuario.carrera;
  
      // muestra alerta
      const alert = await this.alertController.create({
        header: 'Datos del Usuario',
        message: `Nombre: ${this.nombreUsuario}<br>Carrera: ${this.carreraUsuario}`,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }
}