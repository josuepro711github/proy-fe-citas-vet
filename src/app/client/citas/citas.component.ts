import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InfocitaClienteComponent } from './infocita-cliente/infocita-cliente.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent {

  // nombre de la mascota
  displayedColumns = ['idCita', 'nombre', 'fecha','horaCita',  'motivo', 'estado', 'doctor', 'icons'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  constructor(
    public dialog: MatDialog
  ) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cancelarCita(){
    // let doctorEliminado = await lastValueFrom(this.serviceDoctor.eliminarDoctor(idDoctor));

    

  }

  


  abrirDetalle(element: any) {

    this.dialog.open(InfocitaClienteComponent, {
      data: element,

      // panelClass: transparente
      panelClass: 'custom-dialog-container',
      
      
      
    })
    
  }




}

export interface Element {
  idCita: number;
  nombre: string;
  fecha: Date;
  horaCita: string;
  motivo: string;
  estado: string;
  doctor: string; // Representa el nombre del doctor como una cadena
  obaservaciones?: string;
}

export const ELEMENT_DATA: Element[] = [
  { idCita: 1, nombre: 'Mascota1', fecha: new Date(), horaCita: '09:00 AM', motivo: 'Consulta general', estado: 'Pendiente', doctor: 'Dr. Smith', 
  obaservaciones: ' Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum \nha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.' },
  // Agrega más datos de citas según sea necesario --- no funca el \n
];

  

  


