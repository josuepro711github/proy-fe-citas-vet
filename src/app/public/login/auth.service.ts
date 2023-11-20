import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models/Usuario';
import { url_api } from 'src/app/core/shared/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token:any
  private urlApi = ""
  private headersAut:any

  constructor(private http:HttpClient) {
    this.urlApi = url_api
    this.token = this.obtenerToken();
    this.headersAut = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }

  obtenerToken(){
    const token = sessionStorage.getItem("token");
    return token ? (JSON.parse(token)): null;
  }

  login(usuario:Usuario):Observable<any>{
    let body = 'username='+usuario.email+ '&password=' +usuario.contrasenia + '&grant_type=password';
    let headAuthBas = this.headersAut.set('Authorization', 'Basic ' + btoa('user:user'));
    return this.http.post<any>(this.urlApi +'oauth/token',body,{headers:headAuthBas});

}
}