import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Voucher } from '../model/Voucher';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.css']
})
export class VoucherDetailsComponent implements OnInit {

  tipo: string = environment.tipo
  voucher: Voucher = new Voucher
  idVoucher: number
  ok: boolean

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    this.findByIdVoucher(id)
  }

  findByIdVoucher(idVoucher: number) {
    this.clienteService.getByIdVoucher(idVoucher).subscribe((resp:
      Voucher) => {

      this.voucher = resp
      console.log(this.voucher)
    })
  }

  verificar() {
    if (this.tipo == "EMPRESA") {
      this.ok = true

    } else {
      this.ok = false
    }

  }

}