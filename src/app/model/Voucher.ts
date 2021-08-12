import { Usuario } from "./Usuario"

export class Voucher{
  public id_voucher: number
  public empresaParceira: string
  public pontosNecessario: number
  public descricaoVoucher: string
  public produto: string
  public empresaCriadora: Usuario
  public usuariosComVoucher: Usuario[]
  public data: Date
}