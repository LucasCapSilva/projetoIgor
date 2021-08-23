import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { CooperativaService } from 'src/app/service/cooperativa.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-delete-cooperativa',
  templateUrl: './delete-cooperativa.component.html',
  styleUrls: ['./delete-cooperativa.component.css']
})
export class DeleteCooperativaComponent implements OnInit {

  cooperativa: Usuario = new Usuario()
  delOk: boolean = false

  constructor(
    private router: Router,
    private cooperativaService: CooperativaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    let id: number = this.route.snapshot.params["id"]
  }

  // Deletar cooperativa.

    btnSim() {
      this.cooperativaService.deleteByIdCooperativa(this.cooperativa.id_usuario).subscribe(() => {
        
       this.delOk = true

       this.router.navigate(['/home'])
      }, err => {
       console.log(err)
      })
    }
  
  btnNao() {
    this.router.navigate(['/cooperativa'])
  }


}
