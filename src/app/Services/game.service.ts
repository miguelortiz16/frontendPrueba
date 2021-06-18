import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class GameService {
  private url=environment.urlEndPoin;
  public board = [];
  boardSize: number = 9;
  activePlayer: string = "X";
  turnCount: 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;

  constructor( private httpClient:HttpClient) {
     this.newGame()
  }
   
  newGame(){
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver =  false;
    this.winner = false;
    this.board = this.createBoard();
    //crear el juego en la base de datos
   
      return  this.httpClient.post(`${this.url}usuario`,this.board).toPromise();
    
  } 


  joinGame= async(form:any|undefined):Promise<Object>=>{
   
    //crear el juego en la base de datos

     let data={
      form:form
     }
    
     localStorage.setItem("form2",JSON.stringify(form));
   
      return  this.httpClient.post(`${this.url}update`,data).toPromise();
  }

  createGame= async(form)=>{
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver =  false;
    this.winner = false;
    this.board = this.createBoard();
    //crear el juego en la base de datos
   let board=JSON.stringify(this.board);
   localStorage.setItem("board1",JSON.stringify(this.board));
   localStorage.setItem("form1",JSON.stringify(form));
     let data={
      board: board,
      form:form
     }
   
      return  this.httpClient.post(`${this.url}usuario`,data).toPromise();
  }

  createBoard(){
    let board = [];
    for( let i = 0; i < 9; i ++ ){
      board.push( { id: i, state: null } )
    };
    console.log(board);
    return board
  } 

   get getBoard (){
     return this.board
   }

   set setBoard( board  ){
     this.board = [...board]
   }
   
  changePlayerTurn( squareClicked){  
    this.updateBoard( squareClicked )
    if(!this.isGameOver) this.activePlayer = this.activePlayer === "X" ? "O" : "X"
    this.turnCount ++;
    this.isGameOver = this.isGameOver ? true : false;
   }

  updateBoard( squareClicked ){
    this.board[ squareClicked.id ].state = squareClicked.state

    console.log( this.board);
    if (this.isWinner) {
       this.winner = true;
       this.isGameRunning = false;
       this.isGameOver = true;
    }


if (localStorage.getItem("form1")) {
  let form=localStorage.getItem("form1");
  let data={
   
    board: JSON.stringify(this.board),
   form: JSON.parse(form)
  }
  this.httpClient.post(`${this.url}updateGame`,data).toPromise();
  this.httpClient.post(`${this.url}getGame`,data).toPromise();
}else{
  let form=localStorage.getItem("form2");
  let data={
    board: JSON.stringify(this.board),
   form:JSON.parse(form)
  }
  this.httpClient.post(`${this.url}updateGame`,data).toPromise();
   this.httpClient.post(`${this.url}getGame`,data).toPromise();
}

 return this.board;
   
  }

  get gameOver(): boolean{
    return this.turnCount > 8 || this.winner ? true : false
  }

  get isWinner(): boolean{
    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") ? true : false;
  }

   checkRows( board, mode ): boolean{
    
    const
      ROW = mode === "row" ? true : false,
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;

      for ( let i = 0; i < NUMTIMES; i += INC ){

        let 
          firstSquare = board[i].state,
          secondSquare =  board[i + DIST].state,
          thirdSquare = board[ i + ( DIST * 2)].state;

        if ( firstSquare && secondSquare && thirdSquare  ){
           if ( firstSquare === secondSquare && secondSquare === thirdSquare ) return true    
        }
      }
      return false
   }

   checkDiag (){
    const timesRun = 2,
      midSquare = this.board[4].state;

    for( let i = 0; i <= timesRun; i+=2 ){

     let 
      upperCorner = this.board[i].state,
      lowerCorner =  this.board[8 - i].state;
    
      if ( midSquare && upperCorner && lowerCorner  ){
          if( midSquare === upperCorner && upperCorner === lowerCorner) return true
      }
    }

     return false
   }

}
