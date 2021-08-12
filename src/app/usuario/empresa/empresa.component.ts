import { HttpClient, HttpHeaders } from '@angular/common/http';
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
 cpgConfirm = environment.cpf
 tipoConfirm = environment.tipo
 idVoucher: number ;
 nomeEmpresa =  environment.nome 
 descricao: string
 email: string
 idUsuario : number;
 //listaAllVoucher: Usuario[]

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    
    this.idUsuario = environment.id
    alert(this.nomeEmpresa)
    //let id = this.route.snapshot.params[environment.id]

    // Verificando o token
    
    if(environment.token == ''){

      alert('Sua seção expirou, faça o login novamente.')
 
       this.router.navigate(['/home'])
 
     }

    // this.findByIdVoucher()
    this.findAllVoucher()
    this.findAllCliente()
   // this.findByIdCliente(environment.id)

    this.voucher.usuariosComVoucher
  }

  /*validaSenha(senha: string){
    if(senha == this.senhaConfirm){

    }
  }*/

  criarVoucher(){ // ok
  
    this.voucher.empresaParceira = this.nomeEmpresa
  //  console.log(this.id_empresa)
   // console.log(JSON.stringify(this.voucher))
    this.empresaService.postVoucher(3,this.voucher).subscribe((resp: Voucher) =>{
      
      this.voucher = resp
   //   console.log(JSON.stringify(this.voucher))
      alert('Voucher criado!')

      this.voucher = new Voucher()

      this.findAllVoucher()

    })

  }

  atualizarEmpresa(empresa: Usuario){
      
    this.empresaService.putMudarEmpresa(empresa).subscribe((resp: Usuario) =>{

      this.empresa=resp
      alert('Dados atualizados com sucesso!')

      this.router.navigate(['/empresa'])

    })
  }

  findAllVoucher(){ // ok
    this.empresaService.getAllVoucher().subscribe((resp: Voucher[]) => {
      this.listaVoucher = resp
      /*this.listaVoucher.forEach((x) => {
        return x.usuariosComVoucher
      })
      console.log(this.listaVoucher)*/
   //  console.log(JSON.stringify(this.listaVoucher))
    })
  }
  /*
  findByIdVoucher(){
    this.empresaService.getByIdVoucher(this.idVoucher).subscribe((resp: Voucher) => {

      this.voucher = resp

    })
  }*/

  findDescricao(descricao: string){
    this.empresaService.getByDescricao(descricao).subscribe((resp: Voucher[]) => {

      this.listaVoucher = resp

    })
  }

  findAllCliente(){
    this.empresaService.getAllCliente().subscribe((resp: Usuario[]) => {

      this.listaCliente = resp
    //  console.log(JSON.stringify(this.listaCliente))

    })
  }

  findByIdCliente(idCliente: number){
    this.empresaService.getByIdCliente(idCliente).subscribe((resp: Usuario) => {

      this.cliente = resp
      console.log(this.cliente)

    //  console.log(JSON.stringify(this.voucher.empresaParceira == this.empresa.nome))

    })
  }

  findByEmailCliente(emailCliente: string){
    this.empresaService.getByEmail(emailCliente).subscribe((resp: Usuario) => {

      this.cliente = resp

    })
  }

}
