import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { url_api } from 'src/app/core/shared/util/constantes';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  urlApi = ""
  constructor(private http:HttpClient) {
    this.urlApi = url_api
  }



  listarMascotas(id_cliente:number,pageable:Pageable):Observable<any>{
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/mascota/listarMascotasPorCliente/'+id_cliente,pageable);
  }


  registrarMascota(mascota:any,imagen:any):Observable<any>{
    let mascotaGson =JSON.stringify(mascota, null, 0);
    var formData: any = new FormData();
    formData.append('mascota', mascotaGson);
    formData.append('imagen', imagen);
    return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/mascota/registrarMascota',formData);
  }

  listarRazasPorEspecie(id_especie:number):Observable<any[]>{

    return this.http.get<any[]>(this.urlApi+'api/vet/petlife/v1.0.0/mascota/listarRazasPorEspecie/'+id_especie)
  }

  listaEspecies():Observable<any[]>{

    return this.http.get<any[]>(this.urlApi+'api/vet/petlife/v1.0.0/mascota/listarEspecies')
  }
}
