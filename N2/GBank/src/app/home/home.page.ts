import { Component } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public options: Array<any> = [
    { icon: 'wallet-outline', text: 'Depositar' },
    { icon: 'options-outline', text: 'Ajustar limite' },
    { icon: 'help-circle-outline', text: 'Me ajuda' },
  ];

  dataAtual = Date.now();
  public saldo = 300.0;
  public fatura = 102.0;
  public limite = 2898.0;
  public cpf = "48587815857";

  listaClientes: Cliente[] = [];

  pagarFatura() {
    if (this.saldo >= this.fatura) {
      this.saldo = this.saldo - this.fatura;
      this.limite = 2898 + this.fatura;
      this.fatura = 0;
    }
  }

  public slidesOptions: any = { slidesPerView: 3, freeMode: true };

  constructor(private storageService: StorageService) { }
  
  
}




