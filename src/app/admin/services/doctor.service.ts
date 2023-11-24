import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { url_api } from 'src/app/core/shared/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  urlApi = ""
  constructor(private http:HttpClient) {
    this.urlApi = url_api
  }



  listar(pageable:Pageable):Observable<any>{
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/doctor/listarDoctores',pageable);
  }

  registrarDoctor(doctor:any,imagen:any):Observable<any>{
    let doctorGson =JSON.stringify(doctor, null, 0);
    var formData: any = new FormData();
    formData.append('doctor', doctorGson);
    formData.append('imagen', imagen);
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/doctor/registrar' ,formData)
  }

  actualizarDoctor(doctor:any,imagen:any):Observable<any>{
    let doctorGson =JSON.stringify(doctor, null, 0);
    var formData: any = new FormData();
    formData.append('doctor', doctorGson);
    formData.append('imagen', imagen);
    return this.http.put<any>(this.urlApi+'api/vet/petlife/v1.0.0/doctor/actualizar' ,formData)
  }

  listaEspecialidades():Observable<any[]>{

    return this.http.get<any[]>(this.urlApi+'api/vet/petlife/v1.0.0/doctor/lista-especialidades')
  }

  buscarDoctor(idDoctor:number):Observable<any>{

    return this.http.get<any>(this.urlApi+'api/vet/petlife/v1.0.0/doctor/buscar/'+idDoctor)
  }

  traerImagegnDoctor(nombre_imagen:string){
    return this.http.get(`${this.urlApi}api/vet/petlife/v1.0.0/imagen/doctores/${nombre_imagen}`, { responseType: 'blob' });
  }
}
