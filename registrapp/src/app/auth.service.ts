import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async verificarToken(): Promise<boolean> {
    const usuario = await this.obtenerUsuarioActual();

    if (usuario && usuario.token == true){
      return true;
    } else {
      return false;
    }

  }

  async obtenerUsuarioActual(): Promise<any>{
    const usuarios = await Storage.get({key: 'usuarios'});
    const listaUsuarios = usuarios.value ? JSON.parse(usuarios.value) : [];
    const usuarioActual = listaUsuarios.find((usuario: any) => usuario.token === true);
    return usuarioActual;
  }
}
