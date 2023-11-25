import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  private rolAdmin$ = new BehaviorSubject<boolean>(false);

  setRol(rolAdmin: boolean){
    this.rolAdmin$.next(rolAdmin);
  }

  getRol(){
    return this.rolAdmin$.asObservable();
  }


  constructor() { }



  ///
  private sesStorageUpdSub = new Subject<string>();

  sessionStorageUpdate$ = this.sesStorageUpdSub.asObservable();

  notificarActualizacion(key: string): void {
    this.sesStorageUpdSub.next(key);
  }



}
