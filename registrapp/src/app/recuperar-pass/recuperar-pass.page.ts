import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Storage } from '@capacitor/storage';
import { Usuario } from '../registro/registro.page';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  formularioRecuperar: FormGroup;

  usuario: Usuario | null = null;
  nuevaContrasena: string = '';

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController) { 

    this.formularioRecuperar = this.fb.group({
      'mail': new FormControl("", [Validators.required, Validators.email]),
      'pass': new FormControl("", Validators.required),
      'pass2': new FormControl("", Validators.required)
    });

    const mailControl = this.formularioRecuperar.get('mail');
    

    if (mailControl) {
      mailControl.valueChanges.subscribe((email) => {
        this.buscarUsuario(email);
      });
    }

  }

  ngOnInit() {}

  async buscarUsuario(email: string) {
    const usuarios = await Storage.get({ key: 'usuarios' });
    const usuariosArray = usuarios?.value ? JSON.parse(usuarios.value) : [];

    this.usuario = usuariosArray.find((u: Usuario) => u.email === email);

    if (this.usuario) {
      const passControl = this.formularioRecuperar.get('pass');
      const pass2Control = this.formularioRecuperar.get('pass2');

      if (passControl && pass2Control) {
        passControl.setValue(this.usuario?.contrasena);
        pass2Control.setValue(this.usuario?.contrasena);
      }
    } else {
      const passControl = this.formularioRecuperar.get('pass');
      const pass2Control = this.formularioRecuperar.get('pass2');

      if (passControl && pass2Control) {
        passControl.reset();
        pass2Control.reset();
      }
    }
  }

  async actualizarContrasena() {
    if (this.usuario) {
      const passControl = this.formularioRecuperar.get('pass');
      const pass2Control = this.formularioRecuperar.get('pass2');

      if (passControl && pass2Control) {
        const nuevaContrasena = passControl.value;
        const nuevaContrasena2 = pass2Control.value;

        if (nuevaContrasena === nuevaContrasena2) {
          this.usuario.contrasena = nuevaContrasena;

          const usuarios = await Storage.get({ key: 'usuarios' });
          const usuariosArray = usuarios?.value ? JSON.parse(usuarios.value) : [];

          const usuarioIndex = usuariosArray.findIndex((u: Usuario) => u.email === this.usuario?.email);

          if (usuarioIndex !== -1) {
            usuariosArray[usuarioIndex] = this.usuario;

            await Storage.set({
              key: 'usuarios',
              value: JSON.stringify(usuariosArray),
            });

            passControl.reset();
            pass2Control.reset();
          }
        } else {
          this.mostrarAlerta('Contraseñas no coinciden', 'Las contraseñas ingresadas no coinciden. Por favor, inténtalo de nuevo.');
        }
      }
    } else {
      this.mostrarAlerta('Usuario no encontrado', 'El usuario no fue encontrado. Verifica el correo electrónico.');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}


