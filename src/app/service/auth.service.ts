import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioCadastroDTO } from '../model/UsuarioCadastroDTO';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenValido: string = environment.token

  constructor(
    public http: HttpClient
    ) { }

  entrar(usuarioLoginDTO: UsuarioLoginDTO): Observable<UsuarioLoginDTO>{
    this.logado()
    return this.http.post<UsuarioLoginDTO>('https://ecomerceappbr.herokuapp.com/usuarios/logar', usuarioLoginDTO)
  }

  // https://ecomerceappbr.herokuapp.com/ -> rota master.

  cadastrar(usuarioCadastroDTO: UsuarioCadastroDTO): Observable<UsuarioCadastroDTO>{
    return this.http.post<UsuarioCadastroDTO>('https://ecomerceappbr.herokuapp.com/usuarios/cadastrar', usuarioCadastroDTO)
  }

  logado(){
    let ok: boolean = false

    if(this.tokenValido != ''){
      ok = true
    }

   // console.log(this.tokenValido)
    return ok
  }
}
