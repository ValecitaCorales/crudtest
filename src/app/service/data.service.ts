import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Usuario
 {
   id?: string;
   nameC : string ;
   rut : string;
   ocupacion : string;
   mascota : string;
 }

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor( private firestore : Firestore) { }

  getUser(): Observable<Usuario[]>{
    const usuaRef = collection(this.firestore,'users');
    return collectionData(usuaRef,{idField:'id'}) as Observable<Usuario[]> ;
  }
  
  getUserById(id): Observable<Usuario[]>{
    const usuaDocRef = doc(this.firestore, `users/${id}`);
    return docData (usuaDocRef , {idField:'id'}) as Observable<Usuario[]>;
  }

  addUser(user:Usuario){
    const usuaRef = collection(this.firestore,'users');
    return addDoc(usuaRef,user)
  }

  deleteUser(user:Usuario){
    const usuaDocRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(usuaDocRef)
  }

  updateUser(user:Usuario){
    const usuaDocRef = doc(this.firestore,`users/${user.id}` );
    return updateDoc(usuaDocRef , 
      {name : user.nameC, rut : user.rut , ocupacion : user.ocupacion , mascota : user.mascota})
  }

}
