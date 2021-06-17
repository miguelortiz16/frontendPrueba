import { Component, OnInit } from '@angular/core';

import { Usuario } from '../models/Usuario';
import {GameService} from "../Services/game.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  newDeparture=false;
  nowDeparture=true;
  table=false;
  joinDeparture=false;
  chengeOnebutton=true;
  chengeTwobutton=true;
  public usuarioForm: FormGroup;
  public usuario:Usuario|undefined;
  public isEditable: boolean=false;
  private routerParamid:string |number|null=0;
public usuarios$:Promise<Usuario[]>|undefined
  constructor(
    
    public gameService: GameService,
    private router:Router,
    private formBuilder:FormBuilder,
  ) { 

    this.usuarioForm=this.formBuilder.group({
      name:['',Validators.required],
      idGames:['',Validators.required],
     
    })
  }

  ngOnInit(): void {

  }

  resetGame(){
  
    this.gameService.newGame()
  }
  TrueDeparture(){
    
    if ( this.newDeparture) {
      this.newDeparture=false;
      this.joinDeparture=true;
    //  this.usuariosServices.updateUsuario(this.routerParamid,form.value)

    }else{
      this.newDeparture=true;
      this.joinDeparture=false;
    }
   

  }

  falseDeparture(){
  
    if ( this.joinDeparture) {
      this.joinDeparture=false;
      this.newDeparture=true;
    }else{
      this.joinDeparture=true;
      this.newDeparture=false;
    }
  }


  onSubmit(form:FormGroup){
    console.log(form.valid);
    console.log(form.value);
  
    if (form.valid) {
      this.gameService.joinGame(form.value)
      this.nowDeparture=false;
      this.table=true;
        alert(" se unido con exito con exito");
     
     

    }

  }

  create(form:FormGroup){
    console.log(form.valid);
    console.log(form.value);
  
    if (form.valid) {
      this.gameService.createGame(form.value)
      this.nowDeparture=false;
      this.table=true;
        alert(" creado con exito");
     
     

    }
  
   
     
     
     

   

  }




}
