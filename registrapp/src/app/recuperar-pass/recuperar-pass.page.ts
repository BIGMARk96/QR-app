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
  nombre: string = "";
  edad: number = 0;
  rut: string = "";
  carrera: string = "";
  email: string = "";
  contrasena: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  async ObtenerDatos() {
   
      const usuarios = await Storage.get({ key: 'usuarios' });
      this.usuarios = usuarios.value ? JSON.parse(usuarios.value) : [];
    }

    async obtenerUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
      await this.
    ObtenerDatos(); // Asegurarse de tener los datos actualizados
  
      const usuarioEncontrado = this.usuarios.find((usuario) => usuario.email === email);
  
      return usuarioEncontrado;
    }
  }

  



