import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioCadastroDTO } from '../model/UsuarioCadastroDTO';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { AuthService } from '../service/auth.service';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-loginCadastro',
  templateUrl: './loginCadastro.component.html',
  styleUrls: ['./loginCadastro.component.css']
})
export class LoginCadastroComponent implements OnInit {

  usuarioLoginDTO: UsuarioLoginDTO = new UsuarioLoginDTO()

  usuarioCadastrarDTO: UsuarioCadastroDTO = new UsuarioCadastroDTO()

  usuario: Usuario = new Usuario()

  confirmeSenha: string

  tipoUsuarioEscolha: string

  giro: boolean

  cpf: string = "12345678910"

  constructor(
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
   // let id = this.route.snapshot.params[environment.id]
  }

  entrar(){
   // console.log("login "+JSON.stringify(this.usuarioLoginDTO))
    this.authService.entrar(this.usuarioLoginDTO).subscribe((resp:UsuarioLoginDTO) =>{
      this.usuarioLoginDTO = resp

      environment.email = this.usuarioLoginDTO.email
      environment.nome = this.usuarioLoginDTO.nome
      environment.id = this.usuarioLoginDTO.id
      this.utilsService.setLocalStorage('id', this.usuarioLoginDTO.id)
      this.utilsService.setLocalStorage('nome', this.usuarioLoginDTO.nome)
      environment.token = this.usuarioLoginDTO.token
      environment.endereco = this.usuarioLoginDTO.endereco
      environment.tipo = this.usuarioLoginDTO.tipo

     // console.log(environment.email)
     // console.log(environment.nome)
     // console.log(environment.id)
     // console.log(environment.token)
     // console.log(environment.endereco)
     // console.log(environment.tipo)

      if (environment.tipo == "CLIENTE") {
        this.router.navigate(['/cliente'])
      } else if (environment.tipo == "EMPRESA") {
        this.router.navigate(['/empresa'])
       // console.log(JSON.stringify(this.usuario.vouchersEmpresa))
      } else if (environment.tipo == "COOPERATIVA") {
        this.router.navigate(['/cooperativa'])
      }

     // this.router.navigate(['/inicio'])

    },error => {

      if(error.status == 500) {

        alert("Usuário e senha estão incorretos.")

      }

    })
  }

  confirmarSenha(event:any){
    this.confirmeSenha = event.target.value
  }

  tipoUsuario(event:any){
    this.tipoUsuarioEscolha = event.target.value
  }

  cadastrar() {

    this.usuarioCadastrarDTO.tipo = this.tipoUsuarioEscolha
    this.usuarioCadastrarDTO.cpf = this.cpf

    if (this.usuarioCadastrarDTO.senha != this.confirmeSenha) {

      alert("As senhas estão diferentes.")

    } else {

      this.authService.cadastrar(this.usuarioCadastrarDTO).subscribe((resp: UsuarioCadastroDTO) => {
        this.usuarioCadastrarDTO = resp

       /* this.router.navigate(['/entrar'])*/


        alert("Usuário cadastrado com sucesso.")
      })

    }

  }

  girar(){
    this.giro = !this.giro
  }

}
