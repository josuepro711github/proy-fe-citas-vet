import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { InfocitaDoctorComponent } from '../infocita-doctor/infocita-doctor.component';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent {
  displayedColumns = ['duenio', 'mascota', 'motivo', 'fecha', 'hora', 'estado', 'icons'];

  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngAfterViewInit() {
  
    this.dataSource.paginator = this.paginator;
  }

  constructor( public dialog: MatDialog) {
    
  }


  cancelarCita() {
    console.log('Cancelar cita: ');
    // Aquí puedes agregar el código para cancelar la cita
  }
  
  abrirDetalle(element: any) {
    
    // Aquí puedes agregar el código para mostrar más detalles
  }

  diagnosticarCita( element: any) {
    // agregar el modal
    this.dialog.open(InfocitaDoctorComponent, {
      data: element,
      minWidth: '60%',
      // panelClass: transparente
      panelClass: 'custom-dialog-container',
    })
  }



}
export interface Element {
  duenio: string;
  mascota: string;
  motivo: string;
  fecha: string;
  hora: string;
  estado: string;
  observaciones: string;
}


const ELEMENT_DATA: Element[] = [
  {duenio: 'Juan', mascota: 'Firulais', motivo: 'Chequeo', fecha: '2023-12-03', hora: '15:00', estado: 'Confirmado', observaciones: 'La mascota se encuentra en buenas condiciones'},
{duenio: 'Maria', mascota: 'Manchas', motivo: 'Vacunación', fecha: '2023-12-04', hora: '10:00', estado: 'Pendiente' , observaciones: 'La mascota se encuentra en buenas condiciones'},
  
];