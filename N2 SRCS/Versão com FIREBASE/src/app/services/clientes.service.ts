import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
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

  getUser(): Observable<Usuario[]>{
    const userRef = collection(this.firestore, 'clientes');
    return collectionData(userRef, { idField: 'Id'}) as Observable<Usuario[]>;
  }

  getUserById(id): Observable<Usuario>{
    const userDocRef = doc(this.firestore, 'clientes/${id}');
    return docData(userDocRef, { idField: 'id'}) as Observable<Usuario>;
  }

  addUser(user: Usuario) {
    const userRef = collection(this.firestore, 'clientes');
    return addDoc(userRef, user);
  }

  deleteUser(user: Usuario){
    const userDocRef = doc(this.firestore, 'clientes/${user.id}');
    return deleteDoc(userDocRef);
  }

  updateUser(user: Usuario){
    const userDocRef = doc(this.firestore, 'clientes/${user.id}');
    return updateDoc(userDocRef, {cpf: user.cpf, email: user.email, nome: user.nome, senha: user.senha});
  }
}
