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
import { InfocitaClienteComponent } from 'src/app/client/citas/infocita-cliente/infocita-cliente.component';


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

    this.citas.sort((a:any, b:any) => {

      const comparacionFecha = a.cita.fecha.localeCompare(b.cita.fecha);
      if (comparacionFecha === 0) {
        return a.cita.hora_cita - b.cita.hora_cita;
      }
      return comparacionFecha;
    });
    // this.citas = this.citas.filter((f) => f.cita.estado == 0|| f.cita.estado ==2)
    console.log(response)
    this.dataSource = new MatTableDataSource(this.citas);
    this.dataSource.paginator = this.paginator;
  }
  estado= ["Pendiente","Terminado","Derivado","Cancelado"]




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

  async derivarCita(cita_mascota:any){
    const dialogRef = this.dialog.open(FormTerminarDerivarComponent, {
      data: {cita_mascota:cita_mascota,tipo:"Derivar"},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.traerCitas()
      }
    });
  }
  async terminarCita(cita_mascota:any){
    const dialogRef = this.dialog.open(FormTerminarDerivarComponent, {
      data: {cita_mascota:cita_mascota,tipo:"Terminar"},
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

    this.dialog.open(InfocitaClienteComponent, {
      data: citaMascota,
      panelClass: 'custom-dialog-container',
    });
  }
}

