import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getLocalStorage(item: string) {    
    return parseInt(localStorage.getItem(item) || '1')
  }

  setLocalStorage(item: string, value: any){
    localStorage.setItem(item, value.toString())
  }

}


