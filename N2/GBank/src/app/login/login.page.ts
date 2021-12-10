import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cliente = [];

  constructor(private clienteService: ClientesService, private alertCtrl: AlertController) { 
    this.clienteService.getUser().subscribe(res => {
      console.log(res);
      this.cliente = res;
    })
  }

  ngOnInit() {
  }

  async addCli(){
    const alert = await this.alertCtrl.create({
      header: 'Registre-se aqui',
      inputs: [
        {
        name: 'cpf',
        placeholder: 'CPF',
        type: 'text',
      },
      {
        name: 'email',
        placeholder: 'EMAIL',
        type: 'email'
      },
      {
        name: 'nome',
        placeholder: 'NOME',
        type: 'text'
      },
      {
        name: 'senha',
        placeholder: 'SENHA',
        type: 'password'
      }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancelar'
        },
        {
          text: 'Registrar',
          handler: (res) => {
            this.clienteService.addUser({cpf: res.cpf, email: res.email, nome: res.nome, senha: res.senha})
          }
        }
      ]
    });
    await alert.present();
  }

}
