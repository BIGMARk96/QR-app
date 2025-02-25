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
  selectedCity: { id: number; name: string } = { id: 0, name: '' };
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
  selectedCity: { id: number; name: string } = { id: 0, name: '' };
  selectedCommune: string = '';
  cities: { id: number; name: string }[] = [];
  communes: { id: number; name: string }[] = [];

  constructor(private navCtrl: NavController,
    private http: HttpClient,
    private sanitizer: DomSanitizer,){}

  ngOnInit(){
    this.http.get<any>('https://dev.matiivilla.cl/duoc/location/region').subscribe({
      next: (data) => {
        this.cities = data.data.map((city: any) => ({
          id: city.id,
          name: city.nombre,
        }));
      },
      error: (error) => {
        console.error('Error al obtener la lista de ciudades:', error);
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
  
  loadCommunes(city: { id: number; name: string }) {
    const cityId = city.id;
    this.http.get<any>(`https://dev.matiivilla.cl/duoc/location/comuna/${cityId}`).subscribe({
      next: (data) => {
        this.communes = data.data.map((commune: any) => ({
          id: commune.id,
          name: commune.nombre,
        }));
      },
      error: (error) => {
        console.error('Error al obtener la lista de comunas:', error);
      },
    });
  }

  async obtenerDatos() {
    const usuarios = await Storage.get({ key: 'usuarios' });
    this.usuarios = usuarios.value ? JSON.parse(usuarios.value) : [];
  }
}