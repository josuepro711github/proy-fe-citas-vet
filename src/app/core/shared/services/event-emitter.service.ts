import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class  EventEmitterService {
  
  $rol = new EventEmitter<number>();
  
  constructor() {}

  private sesStorageUpdSub = new Subject<string>();

  sessionStorageUpdate$ = this.sesStorageUpdSub.asObservable();

  notificarActualizacion(key: string): void {
    this.sesStorageUpdSub.next(key);
  }


}
