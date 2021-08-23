import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getLocalStorage(item: string, tipo: string) {

    if (tipo == 'number') {
      return parseInt(localStorage.getItem(item) || '1')
    } else if (tipo == 'string') {
      return localStorage.getItem(item)
    } else {
      return null
    }

  }

  setLocalStorage(item: string, value: any) {
    localStorage.setItem(item, value.toString())
  }

}


