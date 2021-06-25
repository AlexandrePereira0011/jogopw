export class Weapons {

  constructor(api: any){
    this.name           =   api.nome;
    this.atk            =   api.Atk;
    this.TipoDeArma     =   api.TipoDeArma;
    this.Durabilidade   =   api.Durabilidade;
    this.idPersonagem   =   api.IDPersonagem;
    }

  name;
  Durabilidade;
  atk;
  idPersonagem;
  TipoDeArma;
}
