import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { Pageable } from 'src/app/core/models/Pageable';
import { Doctor } from 'src/app/core/models/Doctor';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';


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
    'icons'
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
  element: any;
  doctor!: Doctor;

  constructor(
    private serviceDoctor: DoctorService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.listarDoctores();
  }

  listarDoctores(){
    this.serviceDoctor.listar(this.pageable).subscribe((resp) => {
      this.listaDoctores = resp.content;
      this.dataSource = new MatTableDataSource(this.listaDoctores);
      this.dataSource.paginator = this.paginator;
      console.log('lista doctor: ', this.listaDoctores);
    });
  }

  async eliminar(idDoctor:any){
    let doctorEliminado = await lastValueFrom(this.serviceDoctor.eliminarDoctor(idDoctor))
    this.listarDoctores();
  }

  actualizar(idDoctor: any){
    this.router.navigate(['actualizar-doctor/'+idDoctor]);
    console.log('id doctor: ' , idDoctor)
  }

  // showModalInfo(){
  //   Swal.fire();
  // }

}
