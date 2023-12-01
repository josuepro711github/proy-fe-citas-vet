import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  private rol = new BehaviorSubject<number>(0);
  public rol$ = this.rol.asObservable();

  constructor() {}

  private localStorageUpdateSubject = new Subject<string>();

  localStorageUpdate$ = this.localStorageUpdateSubject.asObservable();

  notificarActualizacion(key: string): void {
    this.localStorageUpdateSubject.next(key);
  }



}
