import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { Voucher } from 'src/app/model/Voucher';
import { EmpresaService } from 'src/app/service/empresa.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  voucher: Voucher = new Voucher()

  empresa: Usuario = new Usuario()
  idEmpresa: number

  idLocal: number = environment.id

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Verificando o token

    if (environment.token == '') {

      // alert('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/empresa'])

    }
    let id = this.route.snapshot.params[this.idLocal]
    this.findByIdVoucher(id)
  }

  findByIdVoucher(id: number){
    this.empresaService.getByIdVoucher(id).subscribe((resp: Voucher) => {
      this.voucher = resp
    })
  }

  atualizarVoucher() {
    this.empresa.id_usuario = this.idEmpresa
    this.voucher.empresaCriadora = this.empresa

      this.empresaService.putVoucher(this.voucher).subscribe((resp: Voucher) => {

        this.voucher = resp

        alert('Voucher atualizado com sucesso!')

        this.router.navigate(["/empresa"])

      })

  }


}
