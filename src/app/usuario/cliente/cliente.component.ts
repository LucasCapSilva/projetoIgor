import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { Voucher } from 'src/app/model/Voucher';
import { ClienteService } from 'src/app/service/cliente.service';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Usuario = new Usuario()
  listaVoucher: Voucher[]
  voucher: Voucher = new Voucher()
  delOk: boolean = false
  empresaComVoucher: Voucher
  descricao: string
  idCliente: number
  idUsuario: number  
  idVoucher: number
  listaMeusVoucher: Usuario[]
  empresaParceira: string
  id_voucher: number
  descricaoVoucher: string
  produto: string
  pontosNecessario: number

  
  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnInit(){
  
    this.utilsService.getLocalStorage('id')
    this.findAllVoucher()   
    // this.findByIdVoucher(1)
    this.idUsuario = environment.id
    this.idCliente = this.idUsuario

  }

  findAllVoucher(){
    this.clienteService.getAllVoucher().subscribe((resp: Voucher[]) => {
      this.listaVoucher = resp

     //  console.log(JSON.stringify(this.listaVoucher))    

    })
  }

  findByIdVoucher(idVoucher: number){
    this.clienteService.getByIdVoucher(idVoucher).subscribe((resp: Voucher) => {
      this.voucher = resp
     //  console.log(JSON.stringify(this.listaVoucher))
    })
  }

  pegaId(id: number){
    this.idVoucher = id;
    
    this.findByIdVoucher(this.idVoucher)
  }

  findBydescricaoVoucher(descricao: string){
    this.clienteService.getByDescricaoVoucher(descricao).subscribe((resp: Voucher[]) => {
      this.listaVoucher = resp
     //  console.log(JSON.stringify(this.listaVoucher))
    })
  }


  findByIdCliente(id: number){
    this.clienteService.getByidEmpresa(id).subscribe((resp: Usuario) => {
      this.cliente = resp
    }, err => {
      console.log(`Erro cod: ${err.status}`)
    })
  }

  adquirirVoucher(){  
    this.clienteService.putPegarVoucher(this.idCliente, this.idVoucher).subscribe(() => {
     
    //  console.log(JSON.stringify(this.idVoucher))
      alert('Voucher adquirido!')
      this.findAllVoucher()
    })
  }

  alterarCliente(){
    this.clienteService.putCliente(this.cliente).subscribe((resp: Usuario) => {
      this.cliente = resp
      this.router.navigate(['/cliente'])
    })
  }

  findEmpresaParceira(empresaParceira: string){
    this.clienteService.getEmpresaParceiraVoucher(empresaParceira).subscribe((resp: Voucher) => {

      this.empresaComVoucher = resp

    })
  }

  
  idNumeroVoucher(event: any){

    this.idVoucher = event.target.value

  }

  

}