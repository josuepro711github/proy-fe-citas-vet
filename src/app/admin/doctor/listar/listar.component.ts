import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';

import { Pageable } from 'src/app/core/models/Pageable';
import { Doctor } from 'src/app/core/models/Doctor';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { AlertComponent } from 'src/app/core/shared/components/alert/alert.component';


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
    private router: Router,
    public dialog: MatDialog
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

      // this.dialog.open(AlertComponent, {
      //   data: {tipo:"successful",mensaje:"se abrio la lista correctamente!!"},
      //   disableClose: true,
      // });
    });
  }

  async eliminar(idDoctor:any, nombre:any){
    // let doctorEliminado = await lastValueFrom(this.serviceDoctor.eliminarDoctor(idDoctor));

    const dialogRef = this.dialog.open(AlertComponent, {
      data: {tipo:"warning",mensaje:"Desea eliminar al usuario "+nombre,boton:"Eliminar"},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log(idDoctor)
      if(result){
        this.serviceDoctor.eliminarDoctor(idDoctor).subscribe(response=>{
          this.listarDoctores();
        })
      }
    });

  }

  actualizar(idDoctor: any){
    this.router.navigate(['admin-actualizar-doctor/'+idDoctor]);
    console.log('id doctor: ' , idDoctor)
  }


  abrirDetalle(doctor:any){
    this.dialog.open(ModalInfoComponent, {
      data: doctor,
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });
  }
}
// interface alerta{
//   tipo:string,
//   mensaje:string,
// }
