import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MEditarMascotaComponent } from './m-editar-mascota/m-editar-mascota.component';
import { AlertComponent } from 'src/app/core/shared/components/alert/alert.component';
import { Pageable } from 'src/app/core/models/Pageable';
import { MascotaService } from '../services/mascota.service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth.service';
import { ModalMascotaComponent } from 'src/app/public/pedir-cita/modal-mascota/modal-mascota.component';


@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent {

  mascotas: any[] = []; // Ajusta el tipo según tu modelo de datos en el backend
  userLogueado:any

  pageable: Pageable = {
    page: 0,
    size: 10,
    orderParameter: 'cliente',
    typeOrder: 'ASC',
  };
  constructor( public dialog: MatDialog,private mascotaService:MascotaService,private authService:AuthService) {
    this.userLogueado = this.authService.obtenerToken()
    this.traerMascotas()

  }

  async traerMascotas(){
    const response = await lastValueFrom(this.mascotaService.listarMascotas(this.userLogueado.id_cliente,this.pageable))

    this.mascotas = response.content
    this.mascotas = this.mascotas.filter(mas => mas.estado !="eliminado")
  }

  cancelar( mascota: any) {
    // utilizar el modal para confirmar la cancelación
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {tipo:"warning",mensaje:"Desea eliminar la mascota "+mascota.alias,boton:"Eliminar"},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.mascotaService.eliminarMascota(mascota.id_mascota).subscribe(response=> this.traerMascotas())
      }
    });
  }

  actualizar( mascota: any)  {
    const dialogRef = this.dialog.open(MEditarMascotaComponent,
      {
        // width: '500px',
        width: '60%',
        data : mascota

      });
      dialogRef.afterClosed().subscribe(result=>{
        this.traerMascotas()
      })
  }

  agregarMascota(){
    const dialogRef = this.dialog.open(ModalMascotaComponent,
      {
        // width: '500px',
        width: '60%',
        data : null
      });
      dialogRef.afterClosed().subscribe(result=>{
        this.traerMascotas()
      })
  }



}
