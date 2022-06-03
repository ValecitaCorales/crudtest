import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { Usuario,Perdidos,UserI} from '../models/models';



@Injectable({
  providedIn: 'root'
})



export class DataService {
  
  constructor( private fireStore : AngularFirestore,
               private fireservice :Firestore
                ) { }

 //TODO ESTO PARA AGREGAR USUARIO DE FORMULARIO  

addAdop(user:Usuario){
  const usuaRef = collection(this.fireservice,'Adoptame');
  return addDoc(usuaRef,user)
}
// Para Historial Perdidos 
getFind(): Observable<Perdidos[]>{
  const findRef = collection(this.fireservice,'perdidos');
  return collectionData(findRef,{idField:'id'}) as Observable<Perdidos[]> ;
}
addFind(find:Perdidos){
  const findRef = collection(this.fireservice,'perdidos');
  return addDoc(findRef,find)
}

createDoc(datos: any, path: string, id: string) {

  const collection = this.fireStore;
  return collection.doc(id).set(datos);
}

addUser(datos: UserI){
  const notesRef = collection(this.fireservice, 'Usuarios');
  return addDoc(notesRef, datos)}

getId() {
  return this.fireStore.createId();
}

getCollection<tipo>(path: string) {

  const collection = this.fireStore.collection<tipo>(path);
  return collection.valueChanges();

}

getDoc<tipo>(path: string, id: string) {
 return this.fireStore.collection(path).doc<tipo>(id).valueChanges()
}

updateDoc(path: string, id: string, data: any) {
  return  this.fireStore.collection(path).doc(id).update(data);
}

getUser(): Observable<UserI[]>{
  const notesRef = collection(this.fireservice, 'Usuarios');
  return collectionData(notesRef, {idField: 'id'}) as Observable<UserI[]>;
}

async getById(collection,id){
try{
  return await this.fireStore.collection(collection).doc(id).get();
}catch(error){
  console.log('error en getby',error)
}
}

}
