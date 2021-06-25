export class Personagem {
    constructor(api: any){
        this.nome  = api.Nome;
        this.idp = api.ID;
        this.atk = api.Atk;
        this.int = api.Int;
        this.vida = api.Vida;
        this.idUtilizador = api.ID_Player;
      }
  nome;
  idp;
  atk;
  int;
  vida;
  idUtilizador;


}
