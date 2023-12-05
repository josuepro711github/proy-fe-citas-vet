import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { CitaService } from 'src/app/client/services/cita.service';
import { Pageable } from 'src/app/core/models/Pageable';
import { AlertComponent } from 'src/app/core/shared/components/alert/alert.component';
import { AuthService } from 'src/app/public/services/auth.service';
import { FormTerminarDerivarComponent } from '../form-terminar-derivar/form-terminar-derivar.component';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent {

  displayedColumns = ['idCita', 'fecha','horaCita',  'motivo', 'estado', 'cliente' , 'finalizar','derivar','cancelar','informacion'];
  dataSource = new MatTableDataSource<any>();
  citas:any[]=[]
  pageable: Pageable = {
    page: 0,
    size: 10,
    orderParameter: 'Cita.fecha',
    typeOrder: 'ASC',
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  usuarioLogueado:any
  constructor(private citaService:CitaService,private authService:AuthService,  public dialog: MatDialog){
    this.usuarioLogueado = this.authService.obtenerToken()
    this.traerCitas()
  }

  async traerCitas(){
    const response = await lastValueFrom(this.citaService.listarCitasPorDoctor(this.pageable,this.usuarioLogueado.id_doctor))
    this.citas = response.content
    console.log(response)
    this.dataSource = new MatTableDataSource(this.citas);
    this.dataSource.paginator = this.paginator;
  }
  estado= ["Pendiente","Terminado","Cancelado"]


  async terminarCita(id_cita:number){
    await lastValueFrom(this.citaService.terminarCita(id_cita))
    this.traerCitas()
  }

  async cancelarCita(id_cita:number){
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {tipo:"warning",mensaje:"Desea cancelar la cita!",boton:"Cancelar"},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.citaService.cancelarCita(id_cita).subscribe(response =>  this.traerCitas())
      }
    });
  }

  async derivarCita(cita:any){
    const dialogRef = this.dialog.open(FormTerminarDerivarComponent, {
      data: cita,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        // this.citaService.agregarObservacionCita(cita).subscribe(response =>  this.traerCitas())
      }
    });
  }

  infoCita(citaMascota:any){

  }
}

