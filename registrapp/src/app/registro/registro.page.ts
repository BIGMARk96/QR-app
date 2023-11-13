import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';

export class Usuario {
  nombre: string = "";
  edad: number = 0;
  rut: string = "";
  carrera: string = "";
  email: string = "";
  contrasena: string = "";
  token: boolean = false;
  ciudad: string = "";
  comuna: string = "";
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
  ciudad: string = "";
  comuna: string = "";

  regiones: any[] = []; // Propiedad para almacenar la lista de regiones
  comunas: any[] = []; // Propiedad para almacenar la lista de comunas

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://dev.matiivilla.cl/duoc/location/region').subscribe((regiones: any) => {
      this.regiones = regiones;
    });

    this.http.get('https://dev.matiivilla.cl/duoc/location/comuna').subscribe((comunas: any) => {
      this.comunas = comunas;
    });
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
    usuario.ciudad = this.ciudad;
    usuario.comuna = this.comuna;

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
