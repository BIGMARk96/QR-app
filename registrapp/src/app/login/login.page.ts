import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Usuario } from '../registro/registro.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) { 

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  }

  async validarCredenciales() {
    // Obtener el usuario y la contraseña ingresados por el usuario
    const usuario = this.formularioLogin.get('usuario')?.value;
    const contraseña = this.formularioLogin.get('contraseña')?.value;

    // Obtener la lista de usuarios almacenada en el almacenamiento local
    const usuarios = await Storage.get({ key: 'usuarios' });
    const listaUsuarios = usuarios.value ? JSON.parse(usuarios.value) : [];

    // Buscar si las credenciales coinciden con algún usuario en la lista
    const usuarioEncontrado = listaUsuarios.find((u: Usuario) => u.email === usuario && u.contrasena === contraseña);

    if (usuarioEncontrado) {
      usuarioEncontrado.token = true;

      await Storage.set({ key: 'usuarios', value: JSON.stringify(listaUsuarios) });
      
      this.navCtrl.navigateRoot('/home'); // Reemplaza '/inicio' con tu ruta de página de inicio
    } else {
      // Credenciales inválidas, muestra un mensaje de alerta al usuario
      const alert = await this.alertController.create({
        header: 'Error de inicio de sesión',
        message: 'Las credenciales son incorrectas. Inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }


}
  
  

