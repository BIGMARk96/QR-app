import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class Usuario {
  nombre: string = "";
  edad: number = 0;
  rut: string = "";
  carrera: string = "";
  email: string = "";
  contrasena: string = "";
  token: boolean = false;
  selectedCity: { id: number; name: string; communes: string[] } = { id: 0, name: '', communes: [] };
  selectedCommune: string = '';
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
  selectedCity: { id: number; name: string; communes: string[] } = { id: 0, name: '', communes: [] };
  selectedCommune: string = '';
  cities: { id: number; name: string; communes: string[] }[] = [];
  communes: { id: number; name: string }[] = [];

  constructor(private navCtrl: NavController,
    private http: HttpClient,
    private sanitizer: DomSanitizer,){}

  ngOnInit(){
    this.http.get<any>('assets/regiones.json').subscribe({
      next: (data) => {
        this.cities = data.regiones.map((region: any, index: number) => ({
          id: index,
          name: region.region,
          communes: region.comunas
        }));
      },
      error: (error) => {
        console.error('Error al obtener la lista de regiones:', error);
      },
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
    usuario.selectedCity = this.selectedCity;
    usuario.selectedCommune = this.selectedCommune;

    this.usuarios.push(usuario);

    await Storage.set({
      key: 'usuarios',
      value: JSON.stringify(this.usuarios)
    });
  }
  
  loadCommunes(city: { id: number; name: string; communes: string[] }) {
    this.communes = city.communes.map((commune: string, index: number) => ({
      id: index,
      name: commune,
    }));
  }

  async obtenerDatos() {
    const usuarios = await Storage.get({ key: 'usuarios' });
    this.usuarios = usuarios.value ? JSON.parse(usuarios.value) : [];
  }
}