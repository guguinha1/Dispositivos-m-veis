import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  listaClientes: Cliente[] = [];

  constructor(private storageService: StorageService) { }

  async buscarClientes() {
    this.listaClientes = await this.storageService.getAll();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.buscarClientes();
  }

  async excluirCliente (cpf: string){
    await this.storageService.remove(cpf);
    this.buscarClientes();
  }

}
