import { Voucher } from './../model/Voucher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  tok = environment.token

  token = {
    headers: new HttpHeaders().set('Authorization', this.tok)
  }

  constructor(private http: HttpClient) { }

  getAllVoucher(): Observable<Voucher[]> { // ok
    return this.http.get<Voucher[]>(`
https://ecomerceappbr.herokuapp.com/voucher`, this.token)
  }

  getByIdVoucher(id: number): Observable<Voucher> { // ok
    return this.http.get<Voucher>(`
https://ecomerceappbr.herokuapp.com/voucher/id/${id}`, this.token)
  }

  getByDescricaoVoucher(descricao: string): Observable<Voucher[]> { // ok
    return this.http.get<Voucher[]>(`
    https://ecomerceappbr.herokuapp.com/voucher/descricao/${descricao}`, this.token)
  }

  getEmpresaParceiraVoucher(empresa: string): Observable<Voucher> { // ok
    return this.http.get<Voucher>(`
    https://ecomerceappbr.herokuapp.com/voucher/empresaParceira/${empresa}`, this.token)
  }

  getByidEmpresa(id: number): Observable<Usuario> { // ok
    return this.http.get<Usuario>(`
    https://ecomerceappbr.herokuapp.com/usuario/id/${id}`, this.token)
  }

  putPegarVoucher(id_cliente: number, id_voucher: number): Observable<Voucher> { // ok
    return this.http.put<Voucher>(`
    https://ecomerceappbr.herokuapp.com/voucher/cliente/${id_cliente}/voucher/${id_voucher}`, null)
  }

  putCliente(cliente: Usuario): Observable<Usuario> { 
    return this.http.put<Usuario>("https://ecomerceappbr.herokuapp.com/usuario/mudar",cliente,this.token)
  }

  deleteById(id: number) { // ok
    return this.http.delete(`
    https://ecomerceappbr.herokuapp.com/usuario/id_delete/${id}`, this.token)
  }

  removerVoucher(id: number) { // ok
    return this.http.delete(`
    https://ecomerceappbr.herokuapp.com/usuario/delete/voucher/${id}`, this.token)
  }

}
