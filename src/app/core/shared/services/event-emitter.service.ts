import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

}
