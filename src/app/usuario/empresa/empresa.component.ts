import { HttpClient, HttpHeaders } from '@angular/common/http';
import { hostViewClassName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { Voucher } from 'src/app/model/Voucher';
import { EmpresaService } from 'src/app/service/empresa.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  voucher: Voucher = new Voucher()
  listaVoucher: Voucher[]
  empresa: Usuario = new Usuario()
  listaCliente: Usuario[]
  cliente: Usuario = new Usuario()
  id_empresa: number
  novaEmpresa: Usuario = new Usuario()
  nomeConfirm = environment.nome
  idConfirm = environment.id
  enderecoConfirm = environment.id
  tipoConfirm = environment.tipo
  nomeEmpresa: any
  descricao: string
  email: string
  idUsuario: number | any;
  emailEmpresa: string = environment.email
  voucherItem: Voucher
  delVoucherById: number

  // atualizar voucher

  voucherAtualizado: Voucher


  //listaAllVoucher: Usuario[]

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {

    this.idUsuario = this.utilsService.getLocalStorage('id', 'number')
    this.nomeEmpresa = this.utilsService.getLocalStorage('nome', 'string')
    console.log(this.idUsuario)
    //let id = this.route.snapshot.params[environment.id]

    // Verificando o token

    // if (environment.token == '') {

    //   alert('Sua seção expirou, faça o login novamente.')

    //   this.router.navigate(['/home'])

    // }

    // this.findByIdVoucher()
    this.findAllVoucher()
    this.findAllCliente()
    // this.findByEmailEmpresa()
    // this.findByIdCliente(environment.id)

    this.voucher.usuariosComVoucher
  }

  /*validaSenha(senha: string){
    if(senha == this.senhaConfirm){

    }
  }*/

  criarVoucher() { // ok

    this.voucher.empresaParceira = this.nomeEmpresa
    //  console.log(this.id_empresa)
    // console.log(JSON.stringify(this.voucher))
    this.empresaService.postVoucher(this.idUsuario, this.voucher).subscribe((resp: Voucher) => {

      this.voucher = resp
      //   console.log(JSON.stringify(this.voucher))
      alert('Voucher criado!')

      this.voucher = new Voucher()

      this.findAllVoucher()

    })

  }

  atualizarEmpresa(empresa: Usuario) {

    this.empresaService.putMudarEmpresa(empresa).subscribe((resp: Usuario) => {

      this.empresa = resp
      alert('Dados atualizados com sucesso!')

      this.router.navigate(['/empresa'])

    })
  }

  findAllVoucher() { // ok
    this.empresaService.getAllVoucher().subscribe((resp: Voucher[]) => {
      this.listaVoucher = resp

      console.log(this.listaVoucher)

    })
  }
  /*
  findByIdVoucher(){
    this.empresaService.getByIdVoucher(this.idVoucher).subscribe((resp: Voucher) => {

      this.voucher = resp

    })
  }*/

  findDescricao(descricao: string) {
    this.empresaService.getByDescricao(descricao).subscribe((resp: Voucher[]) => {

      this.listaVoucher = resp

    })
  }

  findAllCliente() {
    this.empresaService.getAllCliente().subscribe((resp: Usuario[]) => {

      this.listaCliente = resp
      //  console.log(JSON.stringify(this.listaCliente))

    })
  }

  findByIdCliente(idCliente: number) {
    this.empresaService.getByIdCliente(idCliente).subscribe((resp: Usuario) => {

      this.cliente = resp
      console.log(this.cliente)

      //  console.log(JSON.stringify(this.voucher.empresaParceira == this.empresa.nome))

    })
  }
  //////////////////////////////////////////////////
  findByEmailEmpresa() {

    this.empresaService.getByEmail(this.emailEmpresa).subscribe((resp: Usuario) => {

      this.empresa = resp

      this.id_empresa = this.empresa.id_usuario


    })
  }

  sair() {

    this.router.navigate(['/home'])
    localStorage.clear()

  }

  setVoucherItem(voucher: Voucher) {

    this.voucherItem = voucher
    this.voucher = voucher

  }

  // deletarVoucher(id: any) {

  //   this.empresaService.deleteByIdVoucher(id).subscribe(() => {

  //     alert('Voucher deletado com sucesso!')

  //   })

  // }

  atualizarVoucher() {

    console.log(this.voucher)
    console.log(this.idUsuario + " id_cliente")

    this.empresaService.putVoucher(
      {
        "id_voucher": this.voucher.id_voucher,
        "empresaParceira": this.voucher.empresaParceira,
        "pontosNecessario": this.voucher.pontosNecessario,
        "descricaoVoucher": this.voucher.descricaoVoucher,
        "produto": this.voucher.produto,
        "empresaCriadora": {
          "id_usuario": this.idUsuario
        }
      }
    ).subscribe((resp: Voucher) => {

      this.voucherItem = resp

      alert('Voucher atualizado com sucesso!')
      this.findAllVoucher()

    })
  }

}
