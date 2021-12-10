import { Component, Input, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientesService, Usuario } from '../services/clientes.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, deleteDoc, doc} from '@angular/fire/firestore';
import { addDoc, collection } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})


export class ClientesPage implements OnInit {
  @Input() id: string;
  cliente = [];


  constructor(private clienteService: ClientesService, private alertCtrl: AlertController, private firestore: Firestore) {
    this.clienteService.getUser().subscribe(res => {
      console.log(res);
      this.cliente = res;
    });

 
  }

  deleteUser(user: Usuario){
    const userDocRef = doc(this.firestore, 'clientes/${user.id}');
    return deleteDoc(userDocRef);
  }

  getUser(): Observable<Usuario[]>{
    const userRef = collection(this.firestore, 'clientes');
    return collectionData(userRef, { idField: 'Id'}) as Observable<Usuario[]>;
  }

  getUserById(id): Observable<Usuario>{
    const userDocRef = doc(this.firestore, 'clientes/${id}');
    return docData(userDocRef, { idField: 'id'}) as Observable<Usuario>;
  }

  updateUser(user: Usuario){
    const userDocRef = doc(this.firestore, 'clientes/${user.id}');
    return updateDoc(userDocRef, {cpf: user.cpf, email: user.email, nome: user.nome, senha: user.senha});
  }


  abrirUser(cliente){

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
            this.clienteService.addUser({cpf: res.cpf, email: res.email, nome: res.nome, senha: res.senha});
          }
        }
      ]
    });
    await alert.present();
  }
  

  ngOnInit() {
  }
}
