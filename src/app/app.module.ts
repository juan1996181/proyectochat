import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ChatComponent } from './component/chat/chat.component'
import { ChatService } from './services/chat.service';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
