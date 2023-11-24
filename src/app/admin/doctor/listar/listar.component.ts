import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Pageable } from 'src/app/core/models/Pageable';
import { Doctor } from 'src/app/core/models/Doctor';
import { DoctorService } from '../../services/doctor.service';


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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageable: Pageable = {
    page: 0,
    size: 10,
    orderParameter: '',
    typeOrder: '',
  };
  listaDoctores: Doctor[] = [];

  constructor(private serviceDoctor: DoctorService) {}

  ngOnInit(): void {
    this.serviceDoctor.listar(this.pageable).subscribe((resp) => {
      this.listaDoctores = resp.content;
      this.dataSource = new MatTableDataSource(this.listaDoctores);
      this.dataSource.paginator = this.paginator;
      console.log('lista doctor: ', this.listaDoctores);
    });
  }
<<<<<<< HEAD
=======

  ngAfterViewInit(): void {
    console.log(this.listaDoctores)
    // this.dataSource.paginator = this.paginator;
  }
>>>>>>> origin/proy-fe-citas-vet_HV
}
