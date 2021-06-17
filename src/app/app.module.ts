import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { HttpClientModule } from "@angular/common/http";

import { ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { GameService } from './Services/game.service';
@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
  
    BoardComponent,
     SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
