import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/service.service';
import { Personagem } from 'src/app/classes/personagem';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  constructor(private service: ServicesService, router:Router) { this.router = router; }

    router: Router;

  ngOnInit(): void {
    this.p1();
    this.p2();
  }

  idP1 = localStorage.getItem("idPlayer");
  idPersonaP1 = localStorage.getItem("idPersona");
  arraypersonagens: Array<Personagem> =[];

   /**PLAYER 2 */
  nomeP1:string;
  atkP1 :number;
  intlP1 :number;
  vidaP1 :number;
  iniciovidaP1:number;
  golpeP1:number=0;

  /**PLAYER 2 */
  nomeP2:string;
  atkP2 :number;
  intlP2 :number;
  vidaP2 :number;
  iniciovidaP2:number;
  golpeP2:number=0;


  recivedata ?: any;
  arrayP1: Array<Personagem> =[];
  personescolhida:Personagem;
  winner;


  p1() {
    this.service.receivePersona().subscribe(
      (x) => {
          this.recivedata = x;
          if(this.recivedata['code'] == 200){
            this.arraypersonagens = this.recivedata['data'].Personagens.map(( y: any) => new Personagem(y) )

            for (let item of this.arraypersonagens) {
              if (item.idp == this.idPersonaP1){
                this.personescolhida = item;
              }
            }
              this.nomeP1 = this.personescolhida.nome;
              this.atkP1  =  this.personescolhida.atk;
              this.vidaP1 = this.personescolhida.vida;
              this.intlP1 = this.personescolhida.int;
              this.iniciovidaP1 = this.vidaP1;
          }else{
            alert("Erro ao personagem!");
          }
    });
  }

  p2(){
    this.service.receiveAleatoria().subscribe((x) => {
      if(x['code'] == 200){
        this.nomeP2 = x['data'].Nome;
        this.atkP2 = x['data'].Atk;
        this.vidaP2 = x['data'].Vida;
        this.intlP2 = x['data'].Int;
        this.iniciovidaP2 = this.vidaP2;
      }
      else{
        console.log('Erro personagem aleatoria!');
      }
    });
  }
  turno ="p1";

   batalhar( ){
    if (this.turno == "p1"){
        this.golpeP1 = Math.floor(Math.random() * this.atkP1) ;
        this.vidaP2 = this.vidaP2 - this.golpeP1;
        this.iniciovidaP2 = Number((this.vidaP2*100)/this.iniciovidaP2);
        if (this.vidaP2<0){
          this.vidaP2=0;
        }
        if (this.vidaP2 == 0){
          this.winner = this.nomeP1;
          document.getElementById("ganhou").style.display="block";
          setTimeout(() => {
            this.router.navigate(['/Menu'])
          }, 3000);
        }else{
          setTimeout(() => {
            this.turno ="p2";
            this.batalhar();
          }, 2000);
        }
      }else{
         this.golpeP2 = Math.floor(Math.random() * this.atkP2);
        this.vidaP1 = this.vidaP1 - this.golpeP2;
        if (this.vidaP1<0){
          this.vidaP1=0;
        }
          if (this.vidaP1 == 0){
            this.winner = this.nomeP2;
            document.getElementById("ganhou").style.display="block";
            setTimeout(() => {
              this.router.navigate(['/Menu'])
            }, 3000);
          }else{
            setTimeout(() => {
              this.turno ="p1";
              this.batalhar();
            }, 2000);
          }
      }
    }

}
