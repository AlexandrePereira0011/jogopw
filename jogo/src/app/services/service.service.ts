import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

   constructor (private http: HttpClient) {
  }

  
    llogin= "http://moreiramoises.pt/server/apis/login.php";

    lnovoregisto = "http://moreiramoises.pt/server/apis/signup.php";

    larma = 'http://moreiramoises.pt/server/apis/createArma.php';

    lpersonagem = "http://moreiramoises.pt/server/apis/createChart.php";

    lreceivePersonagem = 'http://moreiramoises.pt/server/apis/get/getChar.php?PlayerID=';

    lreceiveArma = 'http://moreiramoises.pt/server/apis/get/getArma.php?IDPersonagem=';

    lCriarArma = 'http://moreiramoises.pt/server/apis/createArma.php';

    lreceiveAleatoria = ' http://moreiramoises.pt/server/apis/get/getRandomChar.php?';

    utilizador = localStorage.getItem("nome");
    pass = localStorage.getItem("pass");
    idUtilizador = localStorage.getItem("idUtilizador");
    idpersonagem;

  entrar(utilizador, pass){
    let data: FormData = new FormData();
    data.append("username", utilizador);
    data.append("password", pass);
    return this.http.post(this.llogin, data);
  }

  registo(utilizador, pass){
    let data:FormData = new FormData();
    data.append("username", utilizador);
    data.append("password", pass);
    return this.http.post(this.lnovoregisto, data);
  }

   arma(nome, ataque, durabilidade){
    let data:FormData = new FormData();
    data.append("name", nome);
    data.append("atk", ataque);
    data.append("durabilidade", durabilidade);
    data.append("tipoDeArma",null);
    data.append("vida", null);
    data.append("username", this.utilizador);
    data.append("password", this.pass);
    data.append("idPersonagem", this.idpersonagem);
    console.log(this.utilizador,this.pass,this.idUtilizador);
    return this.http.post(this.larma, data);
  }


  personagem(nome, atk, inteligencia, vida){
    let data:FormData = new FormData();
    data.append("name", nome);
    data.append("atk", atk);
    data.append("isMonster", "false");
    data.append("int", inteligencia);
    data.append("vida", vida);
    data.append("username", this.utilizador);
    data.append("password", this.pass);
    return this.http.post(this.lpersonagem, data);
  }

  receivePersona() {
    return this.http.get(this.lreceivePersonagem + this.idUtilizador);
  }

  receiveArma() {
    return this.http.get(this.lreceiveArma + this.idUtilizador);
  }

  receiveAleatoria() {
    return this.http.get(this.lreceiveAleatoria);
  }



}
