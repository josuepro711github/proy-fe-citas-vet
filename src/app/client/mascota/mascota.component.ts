import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent {

  mascotas: any[] = []; // Ajusta el tipo según tu modelo de datos en el backend

  constructor() {
    // Puedes llamar a un servicio para obtener la lista de mascotas desde el backend
    // Aquí, por simplicidad, estoy creando datos de ejemplo
    this.mascotas = [
      { alias: 'Mascota1', genero: 'Macho', fechaNacimiento: '01/01/2020', imagen: 'imagen1.jpg', raza: 'Raza1', cliente: 'Cliente1' },
      { alias: 'Mascota2', genero: 'Hembra', fechaNacimiento: '02/01/2019', imagen: 'imagen2.jpg', raza: 'Raza2', cliente: 'Cliente1' },
      // Agrega más mascotas según sea necesario
    ];
  }
}
