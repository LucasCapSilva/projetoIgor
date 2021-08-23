import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioCadastroDTO } from '../model/UsuarioCadastroDTO';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { AlertasService } from '../service/alertas.service';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    // let id = this.route.snapshot.params[environment.id]
  }

  entrar() {
    // console.log("login "+JSON.stringify(this.usuarioLoginDTO))
    this.authService.entrar(this.usuarioLoginDTO).subscribe((resp: UsuarioLoginDTO) => {
      this.usuarioLoginDTO = resp

      environment.id = this.usuarioLoginDTO.id
      this.utilsService.setLocalStorage('id', this.usuarioLoginDTO.id)
      environment.nome = this.usuarioLoginDTO.nome
      this.utilsService.setLocalStorage('nome', this.usuarioLoginDTO.nome)
      environment.token = this.usuarioLoginDTO.token
      environment.endereco = this.usuarioLoginDTO.endereco
      environment.tipo = this.usuarioLoginDTO.tipo
      environment.email = this.usuarioLoginDTO.email

      // console.log(environment.email)
      console.log(environment.nome)
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

    }, error => {

      if (error.status == 401) {

        this.alerta.showAlertDanger("Usuário ou senha incorretos")

      }

    })
  }

  confirmarSenha(event: any) {
    this.confirmeSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoUsuarioEscolha = event.target.value
  }

  verificarDados() {

    if (this.usuarioCadastrarDTO.email.indexOf('@') == -1 || this.usuarioCadastrarDTO.email.indexOf('.com') == -1) {

      this.alerta.showAlertDanger("E-mail incorreto!")

    } else {

      if (this.usuarioCadastrarDTO.nome == null || this.usuarioCadastrarDTO.nome.length <= 2) {

        this.alerta.showAlertDanger("Preencha o campo nome!")

      } else {

        if (this.usuarioCadastrarDTO.endereco == null || this.usuarioCadastrarDTO.endereco.length <= 5) {

          this.alerta.showAlertDanger("Campo endereço inválido!")

        } else {

          if (this.usuarioCadastrarDTO.senha.length < 8) {

            this.alerta.showAlertDanger("A senha deve possuir 8 caracteres!")

          } else {

            this.cadastrar()

          }

        }
      }

    }
  }





  cadastrar() {

    this.usuarioCadastrarDTO.tipo = this.tipoUsuarioEscolha



    if (this.usuarioCadastrarDTO.senha != this.confirmeSenha) {

      this.alerta.showAlertDanger("As senhas estão incorretas!")

    } else {

      this.authService.cadastrar(this.usuarioCadastrarDTO).subscribe((resp: UsuarioCadastroDTO) => {
        this.usuarioCadastrarDTO = resp

        /* this.router.navigate(['/entrar'])*/
        this.alerta.showAlertSuccess("Usuário cadastrado com sucesso.")

      }, erro => {
        if (erro.status == 400) {
          this.alerta.showAlertInfo("Email ou usuário existentes")
        } else {
          if (erro.status == 500) {
            this.alerta.showAlertInfo("Por favor, preencha todos os campos")
          }
        }
      })

    }

  }

  girar() {
    this.giro = !this.giro
  }

}
