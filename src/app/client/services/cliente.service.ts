import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_api } from 'src/app/core/shared/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlApi = ""
  constructor(private http:HttpClient) {
    this.urlApi = url_api
  }

  actualizarCliente(cliente:any,imagen:any):Observable<any>{
    let doctorGson =JSON.stringify(cliente, null, 0);
    var formData: any = new FormData();
    formData.append('cliente', doctorGson);
    formData.append('imagen', imagen);
    return this.http.put<any>(this.urlApi+'api/vet/petlife/v1.0.0/cliente/actualizarCliente' ,formData)
  }


}
