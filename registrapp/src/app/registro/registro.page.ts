import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';

export class Usuario {
  nombre: string = "";
  edad: number = 0;
  rut: string = "";
  carrera: string = "";
  email: string = "";
  contrasena: string = "";
  token: boolean = false;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuarios: Usuario[] = [];
  nombre: string = "";
  edad: number = 0;
  rut: string = "";
  carrera: string = "";
  email: string = "";
  contrasena: string = "";
  token: boolean = false;

  ngOnInit(): void {
    // Puedes agregar código de inicialización aquí si es necesario
  }

  async guardarDatos() {
    let usuario = new Usuario();
    usuario.nombre = this.nombre;
    usuario.edad = this.edad;
    usuario.rut = this.rut;
    usuario.carrera = this.carrera;
    usuario.email = this.email;
    usuario.contrasena = this.contrasena;
    usuario.token = this.token;

    this.usuarios.push(usuario);

    await Storage.set({
      key: 'usuarios',
      value: JSON.stringify(this.usuarios)
    });
  }
  

  async obtenerDatos() {
    const usuarios = await Storage.get({ key: 'usuarios' });
    this.usuarios = usuarios.value ? JSON.parse(usuarios.value) : [];
  }
}