import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { Voucher } from '../model/Voucher';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  tok = environment.token

  token = {
    headers: new HttpHeaders().set('Authorization', this.tok)
  }

  constructor(private http: HttpClient) { }

  postVoucher(id: number, voucher: Voucher): Observable<Voucher> { // ok

    return this.http.post<Voucher>(`https://ecomerceappbr.herokuapp.com/usuario/empresa/${id}/criar`, voucher)
  }

  deleteByIdEmpresa(idEmpresa: number): Observable<Usuario> { // ok 
    return this.http.delete<Usuario>(`https://ecomerceappbr.herokuapp.com/usuario/id_delete/${idEmpresa}`)
  }

  deleteByIdVoucher(idVoucher: number): Observable<Voucher> { // ok
    return this.http.delete<Voucher>(`https://ecomerceappbr.herokuapp.com/voucher/id_delete/${idVoucher}`)
  }

  putVoucher(voucher: any): Observable<Voucher> { // ok
    return this.http.put<Voucher>(`https://ecomerceappbr.herokuapp.com/voucher`, voucher)
  }

  putMudarEmpresa(usuario: Usuario): Observable<Usuario> { // ok 
    return this.http.put<Usuario>(`https://ecomerceappbr.herokuapp.com/usuario/mudar`, usuario)
  }

  getAllVoucher(): Observable<Voucher[]> { // ok
    //  console.log(this.tok)
    return this.http.get<Voucher[]>(`https://ecomerceappbr.herokuapp.com/voucher`)
  }

  getByIdVoucher(idVoucher: number): Observable<Voucher> { // ok
    return this.http.get<Voucher>(`https://ecomerceappbr.herokuapp.com/voucher/id/${idVoucher}`)
  }

  getByDescricao(descricao: string): Observable<Voucher[]> { // ok
    return this.http.get<Voucher[]>(`https://ecomerceappbr.herokuapp.com/voucher/descricao/${descricao}`)
  }

  getAllCliente(): Observable<Usuario[]> { // ok
    return this.http.get<Usuario[]>(`https://ecomerceappbr.herokuapp.com/usuario`)
  }

  getByIdCliente(idCliente: number): Observable<Usuario> { // ok
    return this.http.get<Usuario>(`https://ecomerceappbr.herokuapp.com/usuario/id/${idCliente}`)
  }

  getByEmail(email: string): Observable<Usuario> { // ok
    return this.http.get<Usuario>(`https://ecomerceappbr.herokuapp.com/usuario/email/${email}`)
  }

}
