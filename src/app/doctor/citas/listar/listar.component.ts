import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';


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


  cancelarCita() {
    console.log('Cancelar cita: ');
    // Aquí puedes agregar el código para cancelar la cita
  }
  
  abrirDetalle() {
    console.log('Mostrar más detalles: ');
    // Aquí puedes agregar el código para mostrar más detalles
  }



}
export interface Element {
  duenio: string;
  mascota: string;
  motivo: string;
  fecha: string;
  hora: string;
  estado: string;
}


const ELEMENT_DATA: Element[] = [
  {duenio: 'Juan', mascota: 'Firulais', motivo: 'Chequeo', fecha: '2023-12-03', hora: '15:00', estado: 'Confirmado'},
{duenio: 'Maria', mascota: 'Manchas', motivo: 'Vacunación', fecha: '2023-12-04', hora: '10:00', estado: 'Pendiente'},
  
];