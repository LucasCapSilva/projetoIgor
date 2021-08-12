import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class CooperativaService {


  tok = environment.token
  
  token = {
    headers: new HttpHeaders().set('Authorization', this.tok)
  }

  constructor(private http: HttpClient) { }

  getByIdCliente(id: number): Observable<Usuario> { // ok
    return this.http.get<Usuario>(`
    https://ecomerceappbr.herokuapp.com/usuario/id/${id}`, this.token)

  }

  getByEnderecoCliente(endereco: string): Observable<Usuario[]> { // OK
    return this.http.get<Usuario[]>(`
    https://ecomerceappbr.herokuapp.com/usuario/endereco/${endereco}`, this.token)

  }

  putAddPontuacao(idCliente: number, idCooperativa: number, valor: number) { // ok
    return this.http.put(`https://ecomerceappbr.herokuapp.com/usuario/cliente/${idCliente}/cooperativa/${idCooperativa}/valor/${valor}`, this.token)
  }

  putMudarCooperativa(usuario: Usuario): Observable<Usuario> { // ok
    return this.http.put<Usuario>(`
    https://ecomerceappbr.herokuapp.com/usuario/mudar`, usuario, this.token)
  }

  deleteByIdCooperativa(id: number) { // ok
    return this.http.delete(`
    https://ecomerceappbr.herokuapp.com/usuario/id_delete/${id}`, this.token)
  }

}
