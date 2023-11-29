import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent {

  displayedColumns = ['idCita', 'fecha','horaCita',  'motivo', 'estado', 'doctor'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Element {
  idCita: number;
  fecha: Date;
  horaCita: string;
  motivo: string;
  estado: string;
  doctor: string; // Representa el nombre del doctor como una cadena
}

export const ELEMENT_DATA: Element[] = [
  { idCita: 1, fecha: new Date(), horaCita: '09:00 AM', motivo: 'Consulta general', estado: 'Pendiente', doctor: 'Dr. Smith' },
  // Agrega más datos de citas según sea necesario
];

  

  


