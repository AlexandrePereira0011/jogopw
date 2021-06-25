import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/service.service';
import { Personagem } from 'src/app/classes/personagem';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Weapons } from 'src/app/classes/weapons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private service: ServicesService, router:Router,config: NgbModalConfig, private modalService: NgbModal) {
    this.router = router;
    config.backdrop = 'static';
    config.keyboard = false; }

    router: Router;


  ngOnInit(): void {
    this.recebePersona();
    /* this.recebeArma(); */
  }

  posicao =0;

  dadosR;

  personagens : Array<Personagem> = [];

/*
dados;
posicaoW = 0;
armasarray : Array<Weapons> = [];
 */
  recebePersona() {
    this.service.receivePersona().subscribe(
      (data) => {
          this.dadosR = data;
          console.log(this.dadosR['data'].Personagens);
          if(this.dadosR['code'] == 200){
            this.personagens = this.dadosR['data'].Personagens.map(( x: any) => new Personagem(x) )
            this.service.idpersonagem = this.personagens[0].idp;
            localStorage.setItem("idPersona", this.personagens[0].idp);
            console.log(localStorage.getItem("idPersona"));
          }else{
            alert("Não existem personagem");
          }
    });
  }


  /*  ARMAS NÃO FUNCIONA, NÃO CONSEGUI DESCOBRIR O PORQUE DO ERRO VISTO QUE ESTA FIZ O MESMO QUE FIZ PARA AS PERSONAGENS

  recebeArma() {
    this.service.receiveArma().subscribe(
      (data) => {
          this.dados = data;
          console.log(this.dados['data'].Armas);
          if(this.dados['code'] == 200){
            this.armasarray = this.dados['data'].Armas.map(( x: any) => new Weapons(x) )
          }else{
            alert("Não existem armas");
          }
    });
  }
 */

  opcaoSelect(event){
    this.posicao = event.target.value;
    this.service.idpersonagem = this.personagens[this.posicao].idp;
    localStorage.setItem("idPersona", this.personagens[this.posicao].idp);
    console.log(localStorage.getItem("idPersona"));
  }
 /* escolher opcção armas

 opcaoSelectW(event){
    this.posicaoW = event.target.value;
  }
 */
  abrirCriarpersonagem(criarPersonagem) {
    this.modalService.open(criarPersonagem);
  }

  abrirCriarArma(criarArma){
    this.modalService.open(criarArma);
  }

  personagem(nome, atk, inteligencia, vida,criarPersonagem){
    this.service.personagem(nome, atk, inteligencia, vida).subscribe((x) => {
      console.log(nome,atk, inteligencia, vida );
        if (x['code'] == 200 ){
          this.modalService.dismissAll(criarPersonagem);
          console.log(x);
        }else{
          alert("erro ao criar personagem");
        }
      }
      );
  }

  arma(nome, atk,  durabilidade, criarArma){
    console.log(nome, atk,  durabilidade, criarArma);
    this.service.arma(nome, atk, durabilidade).subscribe((x) => {
          if (x['code'] == 200 ){
            this.modalService.dismissAll(criarArma);
            console.log(x);
          }else{
            alert("EROO CRIAR ARMA");
          }
        }
        );
    }

}



