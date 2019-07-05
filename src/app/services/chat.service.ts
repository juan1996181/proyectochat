import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators'

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chats: Mensaje[]= [];
  public usuario: any = {};
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  constructor( private afs: AngularFirestore, public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user=>{
      console.log('estado del usuario', user);
      if(!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.img = user.photoURL;
    })
  }
  login(proveedor: string) {
    if(proveedor == 'google'){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }else{
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }
  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
    .limit(5));
    return this.itemsCollection.valueChanges().pipe(map((mensajes:Mensaje[]) =>{
      this.chats = [];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
      return this.chats;
      // this.chats = mensajes;
    }))
  }
  agregarMensaje(texto: string){
    let mensaje:Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
      img: this.usuario.img
    }
    //console.log(this.usuario.img);
    return this.itemsCollection.add(mensaje);
  }
}
