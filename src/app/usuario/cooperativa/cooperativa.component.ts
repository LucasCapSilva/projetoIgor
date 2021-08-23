import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { CooperativaService } from 'src/app/service/cooperativa.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cooperativa',
  templateUrl: './cooperativa.component.html',
  styleUrls: ['./cooperativa.component.css']
})
export class CooperativaComponent implements OnInit {

  cliente: Usuario
  cooperativa: Usuario = new Usuario()
  endereco: string
  listaCliente: Usuario[]
  idCoop: number = environment.id
  idCliente: number
  pontosCliente: number
  coopSenha: string // o usuário coop digita a senha.
  idCooperativa: number | any
  tipoCooperativa = environment.tipo
  nomeCooperativa: any

  //  clienteJoel: Usuario = new Usuario()

  constructor(
    private router: Router,
    private cooperativaService: CooperativaService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.idCooperativa = this.utilsService.getLocalStorage('idCooperativa', 'number')
    this.nomeCooperativa = this.utilsService.getLocalStorage('nome', 'string')
  }

  findByIdCliente(idCliente: number) {
    this.cooperativaService.getByIdCliente(idCliente).subscribe((resp: Usuario) => {

      this.cliente = resp

    })
  }

  findByEnderecoCliente(endereco: string) {
    this.cooperativaService.getByEnderecoCliente(endereco).subscribe((resp: Usuario[]) => {

      this.listaCliente = resp
      //   console.log(JSON.stringify(this.listaCliente))
    })
  }

  addPonto() {
    // console.log(JSON.stringify(this.idCliente))
    //  console.log(JSON.stringify(this.idCoop))
    //console.log(JSON.stringify(this.pontosCliente))
    // this.clienteJoel.id_usuario = this.idCliente
    this.cooperativaService.putAddPontuacao(this.idCliente, this.idCoop, this.pontosCliente).subscribe(() => {

      alert('Pontos adicionados com sucesso!')

    })

  }

  idClienteJoel(event: any) {

    this.idCliente = event.target.value

  }

  idPontosGui(event: any) {

    this.pontosCliente = event.target.value

  }


  atualizarCooperativa() {

    console.log(this.coopSenha)

    if (this.coopSenha != this.cooperativa.senha) {

      alert('As senhas estão incorretas.')

    } else {

      this.cooperativa.id_usuario = this.idCooperativa
      this.cooperativa.tipo = this.tipoCooperativa

      this.cooperativaService.putMudarCooperativa(this.cooperativa).subscribe((resp: Usuario) => {

        this.cooperativa = resp

        alert('Usuário atualizado com sucesso, faça o login novamente.')

        // environment.token = ''
        // environment.nome = ''
        // environment.id = 0

        this.router.navigate(['/home'])

      })
    }

  }

  AtualizaCoopSenha(event: any) {

    this.coopSenha = event.target.value

  }

  sair() {

    this.router.navigate(['/home'])
    localStorage.clear()

  }

}
