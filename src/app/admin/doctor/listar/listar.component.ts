import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../../services/doctor.service';
import { Pageable } from 'src/app/core/models/Pageable';
import { Doctor } from 'src/app/core/models/Doctor';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = [
    'dni',
    'nombres',
    'telefono',
    'fecha_nacimiento',
  ];
  dataSource = new MatTableDataSource<Doctor>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pageable: Pageable = {
    page: 0,
    size: 9,
    orderParameter: '',
    typeOrder: '',
  };
  listaDoctores: Doctor[] = [];

  constructor(private serviceDoctor: DoctorService) {}

  ngOnInit(): void {
    this.serviceDoctor.listar(this.pageable).subscribe((resp) => {
      this.listaDoctores = resp.content;
      this.dataSource = new MatTableDataSource<Doctor>(this.listaDoctores);
      this.dataSource.paginator = this.paginator;
      console.log('lista doctor: ', this.listaDoctores);
    });
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
}