import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voucher } from 'src/app/model/Voucher';
import { EmpresaService } from 'src/app/service/empresa.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-delete-voucher',
  templateUrl: './delete-voucher.component.html',
  styleUrls: ['./delete-voucher.component.css']
})
export class DeleteVoucherComponent implements OnInit {

  voucher: Voucher = new Voucher()  
  id: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    // Verificando o token

    if (environment.token == '') {

      // alert('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/empresa'])

    }
    this.id = this.route.snapshot.params['id']
  }

  // Deletar Voucher.

  btnSim() {

    this.empresaService.deleteByIdVoucher(this.id).subscribe(() => {

      alert('Voucher deletado com sucesso!')

      this.router.navigate(['/empresa'])

    })

  }

  btnNao() {

    this.router.navigate(['/empresa'])

  }


}
