import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  nombre: string="";
  edad: number=0;
  rut: string="";
  carrera: string="";
  email: string="";
  contrasena: string="";

  async guardarDatos() {
    

     await Storage.set({
      key: 'email',
      value: this.email
    });

    await Storage.set({
      key: 'contrasena',
      value: this.contrasena
    });
  }
}
