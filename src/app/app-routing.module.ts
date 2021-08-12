import { ContatoComponent } from './contato/contato.component';
import { SobreNosComponent } from './sobreNos/sobreNos.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MenuComponent } from './menu/menu.component';
import { LoginCadastroComponent } from './loginCadastro/loginCadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './usuario/empresa/empresa.component';
import { CooperativaComponent } from './usuario/cooperativa/cooperativa.component';
import { ClienteComponent } from './usuario/cliente/cliente.component';
import { Voucher } from './model/Voucher';
import { DeleteClienteComponent } from './delete/delete-cliente/delete-cliente.component';
import { DeleteCooperativaComponent } from './delete/delete-cooperativa/delete-cooperativa.component';
import { DeleteEmpresaComponent } from './delete/delete-empresa/delete-empresa.component';
import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';
import { DeleteVoucherComponent } from './delete/delete-voucher/delete-voucher.component';
const routes: Routes = [
{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path:'home',
 component: LoginCadastroComponent
},
{
  path:'menu',
 component: MenuComponent
},
{
  path:'rodape',
 component: RodapeComponent
},
{
  path:'sobreNos',
 component: SobreNosComponent
},
{
  path:'contato',
 component: ContatoComponent
},
{
  path: 'empresa',
  component: EmpresaComponent
},
{
  path: 'cooperativa',
  component: CooperativaComponent
},
{
  path: 'cliente',
  component: ClienteComponent
},

{
  path: 'voucher/:id',
  component: Voucher
},

{
  path: 'deleteCliente/:id',
  component: DeleteClienteComponent
},

{
  path: 'deleteVoucher/:id',
  component: DeleteVoucherComponent
},

{
  path: 'deleteCooperativa/:id',
  component: DeleteCooperativaComponent
},

{
  path: 'deleteEmpresa/:id',
  component: DeleteEmpresaComponent
},

{path: 'voucher-details/:id',
  component: VoucherDetailsComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
