import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from 'src/app/core/models/Doctor';
import { Pageable } from 'src/app/core/models/Pageable';
import { url_api } from 'src/app/core/shared/util/constantes';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlApi = ""
  constructor(private http:HttpClient) { 
    this.urlApi = url_api;
  }

  listar(pageable:Pageable):Observable<any>{
      return this.http.post<any>(this.urlApi+'api/vet/petlife/v1.0.0/doctor/listarDoctores',pageable);
  }


}
