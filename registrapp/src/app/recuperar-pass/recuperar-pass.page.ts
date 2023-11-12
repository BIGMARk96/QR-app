import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Usuario } from '../registro/registro.page';


@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  usuarios: Usuario[] = [];
  emailUsuario: string = "";
  usuarioEncontrado: Usuario | undefined;
  contraseñaAntigua:string="";
  nuevaContrasena: string = "";

  constructor() { }

  ngOnInit(): void {
    this.ObtenerDatos();
  }

  async ObtenerDatos() {
    const usuarios = await Storage.get({ key: 'usuarios' });
    this.usuarios = usuarios.value ? JSON.parse(usuarios.value) : [];
  }

  async obtenerUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
    await this.ObtenerDatos();
    const usuarioEncontrado = this.usuarios.find((usuario) => usuario.email === email);
    return usuarioEncontrado;
  }

  async ContraseñaAntigua(contrasena: string): Promise<Usuario | undefined> {
    await this.ObtenerDatos();
    const usuarioEncontrado = this.usuarios.find((usuario) => usuario.contrasena=== contrasena);
    return usuarioEncontrado;
  }
  async cambiarContrasena() {
    // Obtener datos actuales del usuario
    await this.ObtenerDatos();

    // Buscar al usuario
    const usuario = this.usuarios.find((u) => u.email === this.emailUsuario);

    if (usuario) {
      // Modificar la contraseña
      usuario.contrasena = this.nuevaContrasena;

      // Actualizar el almacenamiento
      await Storage.set({
        key: 'usuarios',
        value: JSON.stringify(this.usuarios),
      });

      console.log('Nueva contraseña:', usuario.contrasena);

      console.log('Contraseña cambiada con éxito.');
    } else {
      console.error('Usuario no encontrado.');
    }
  }
}


  


    
    

  



