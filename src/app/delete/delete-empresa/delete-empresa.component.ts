import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-delete-empresa',
  templateUrl: './delete-empresa.component.html',
  styleUrls: ['./delete-empresa.component.css']
})
export class DeleteEmpresaComponent implements OnInit {

  empresa: Usuario = new Usuario()
  delOk: boolean = false

  constructor(

    private router: Router,
    private empresaService: EmpresaService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    let id: number = this.route.snapshot.params["id"]
  }

  btnSim() {
    this.empresaService.deleteByIdEmpresa(this.empresa.id_usuario).subscribe(() => {
      this.delOk = true
      this.router.navigate(['/home'])
    }, err => {
      console.log(err)
    })
  }
  btnNao() {
    this.router.navigate(['/empresa'])
  }

}
