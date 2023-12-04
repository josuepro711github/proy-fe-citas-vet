import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CitaService } from '../services/cita.service';
import { Pageable } from 'src/app/core/models/Pageable';
import { AuthService } from 'src/app/public/services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent {

  displayedColumns = ['idCita', 'fecha','horaCita',  'motivo', 'estado', 'doctor','informacion'];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>();

  usuarioLogueado:any
  constructor(private citaService:CitaService,private authService:AuthService){
    this.usuarioLogueado = this.authService.obtenerToken()
    this.traerCitasCliente()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  pageable: Pageable = {
    page: 0,
    size: 10,
    orderParameter: 'Cita.fecha',
    typeOrder: 'ASC',
  };
  citasCliente:any[]=[]

  async traerCitasCliente(){
    const response = await lastValueFrom(this.citaService.listarCitasCliente(this.pageable,this.usuarioLogueado.id_cliente))
    this.citasCliente = response.content
    console.log(response)
    this.dataSource = new MatTableDataSource(this.citasCliente);
    this.dataSource.paginator = this.paginator;
  }

  estado= ["Pendiente","Terminado","Cancelado"]


  infoCita(citaMascota:any){

  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
}

// export interface Element {
//   idCita: number;
//   fecha: Date;
//   horaCita: string;
//   motivo: string;
//   estado: string;
//   doctor: string; // Representa el nombre del doctor como una cadena
// }

// export const ELEMENT_DATA: Element[] = [
//   { idCita: 1, fecha: new Date(), horaCita: '09:00 AM', motivo: 'Consulta general', estado: 'Pendiente', doctor: 'Dr. Smith' },
//   // Agrega más datos de citas según sea necesario
// ];






