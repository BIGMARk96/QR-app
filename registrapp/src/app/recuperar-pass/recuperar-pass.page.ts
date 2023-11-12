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

  buscarUsuario() {
    this.obtenerUsuarioPorEmail(this.emailUsuario)
      .then(usuario => {
        this.usuarioEncontrado = usuario;
        if (usuario) {
          console.log('Usuario encontrado:', usuario);
        } else {
          console.log('Usuario no encontrado');
        }
      })
      .catch(error => console.error('Error al buscar usuario:', error));
  }

  
}

    
    

  



