import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  private rol = new BehaviorSubject<number>(0);
  public rol$ = this.rol.asObservable();

  constructor() {}

  private sesStorageUpdSub = new Subject<string>();

  sessionStorageUpdate$ = this.sesStorageUpdSub.asObservable();

  notificarActualizacion(key: string): void {
    this.sesStorageUpdSub.next(key);
  }

  private mensajero = new ReplaySubject<number>(1)
  
  public get recibir() {
    return this.mensajero.asObservable()
  }

  public enviar(id: number): void {
    this.mensajero.next(id);
  }

}
