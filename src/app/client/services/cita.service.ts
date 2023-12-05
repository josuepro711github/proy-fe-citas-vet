import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { url_api } from 'src/app/core/shared/util/constantes';


@Injectable({
  providedIn: 'root'
})
export class CitaService {

  urlApi = ""
  constructor(private http:HttpClient) {
    this.urlApi = url_api
  }



  listarCitasCliente(pageable:Pageable,id_cliente:number):Observable<any>{
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/cita/listarCitasPorCliente/'+id_cliente,pageable);
  }

  listarCitasPorDoctor(pageable:Pageable,id_doctor:number):Observable<any>{
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/cita/listarCitasPorDoctor/'+id_doctor,pageable);
  }


  cancelarCita(id_cita:number):Observable<void>{
    return this.http.put<void>(this.urlApi+'api/vet/petlife/v1.0.0/cita/cancelarCita/'+id_cita,null);
  }

  terminarCita(id_cita:number):Observable<void>{
    return this.http.put<void>(this.urlApi+'api/vet/petlife/v1.0.0/cita/terminarCita/'+id_cita,null);
  }


  registrarCita(citaMascota:any):Observable<any>{
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/cita/registrarCita',citaMascota);
  }

  agregarObservacionCita(citaMascota:any):Observable<any>{
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/cita/actualizarCita',citaMascota);
  }
}
