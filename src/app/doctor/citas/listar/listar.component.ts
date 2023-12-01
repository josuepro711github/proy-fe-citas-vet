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
  displayedColumns = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' , status: 'Pendiente'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 'Pendiente'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'Pendiente'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'Pendiente'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'Pendiente'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'Pendiente'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status: 'Pendiente'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status: 'Pendiente'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status: 'Pendiente'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status: 'Pendiente'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', status: 'Pendiente'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', status: 'Pendiente'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', status: 'Pendiente'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', status: 'Pendiente'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', status: 'Pendiente'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', status: 'Pendiente'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', status: 'Pendiente'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', status: 'Pendiente'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', status: 'Pendiente'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', status: 'Pendiente'},
];