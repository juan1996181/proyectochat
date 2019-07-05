import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  mensaje: string = "";
  element: any;
  constructor(public _cs : ChatService) { 
    _cs.cargarMensajes().subscribe(
      ()=>{
        setTimeout(() => {
           this.element.scrollTop = this.element.scrollHeight;  
        }, 20);
       
      }
    )
  }

  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
  }
  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length == 0){
      return;
    }
    this._cs.agregarMensaje(this.mensaje)
      .then(()=> this.mensaje="")
      .catch((err)=> console.error('Error al enviar', err));
  }
}
