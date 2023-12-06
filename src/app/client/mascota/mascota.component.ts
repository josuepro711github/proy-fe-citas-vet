import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MEditarMascotaComponent } from './m-editar-mascota/m-editar-mascota.component';
import { AlertComponent } from 'src/app/core/shared/components/alert/alert.component';


@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent {

  mascotas: any[] = []; // Ajusta el tipo según tu modelo de datos en el backend

  constructor( public dialog: MatDialog) {
    // Puedes llamar a un servicio para obtener la lista de mascotas desde el backend
    // Aquí, por simplicidad, estoy creando datos de ejemplo
    this.mascotas = [
      { alias: 'Mascota1', genero: 'Macho', fechaNacimiento: '01/01/2020', imagen: 'imagen1.jpg', especie: 'Perro', raza: 'Pitbull', cliente: 'Cliente1' },
      { alias: 'Mascota2', genero: 'Hembra', fechaNacimiento: '02/01/2019', imagen: 'imagen2.jpg', especie: 'Gato', raza: 'Persa', cliente: 'Cliente1' },
      // Agrega más mascotas según sea necesario
    ];
  }

  cancelar( mascota: any) {
    // utilizar el modal para confirmar la cancelación
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {tipo:"warning",mensaje:"Desea eliminar la mascota "+mascota.alias,boton:"Eliminar"},
      disableClose: true,
    });
  }

  actualizar( mascota: any)  {
    const dialogRef = this.dialog.open(MEditarMascotaComponent,
      {
        // width: '500px',
        width: '60%',
        data : mascota

      });
  }




}
