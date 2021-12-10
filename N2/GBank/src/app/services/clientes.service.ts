import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: string;
  cpf: string;
  email: string;
  nome: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private firestore: Firestore  ) { }

/*   getClientes() {
    return this.af.collection('clientes')
  } */

  getUser(){
    const userRef = collection(this.firestore, 'clientes');
    return collectionData(userRef, { idField: 'nome'});
  }

  addUser(user: Usuario) {
    const userRef = collection(this.firestore, 'clientes');
    return addDoc(userRef, user);
  }

  deleteUser(user: Usuario){
    const userDocRef = doc(this.firestore, 'clientes/${user.id}');
    return deleteDoc(userDocRef);
  }

  /* updateUser(user: Usuario){
    const userDocRef = doc(this.firestore, 'clientes/${user.id}');
    return this.updateUser(userDocRef, {cpf: cpf, email: email, nome: nome, senha: senha});
  } */
}