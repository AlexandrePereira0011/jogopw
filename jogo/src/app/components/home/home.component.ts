import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal , NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal]
})

export class HomeComponent implements OnInit {

  constructor( private service: ServicesService,  router:Router ,config: NgbModalConfig, private modalService: NgbModal ) {
    this.router = router;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  router: Router;

  abrir(login) {
    this.modalService.open(login);
  }

  abrirCriar(registo,login) {
    this.modalService.dismissAll(login);
    this.modalService.open(registo);
  }

  ngOnInit(): void {
  }


 entrar(utilizador, pass, login) {
      this.service.entrar(utilizador, pass).subscribe((x) => {
        if (x['code'] == 200 ){
          this.service.idUtilizador =  x['data'];
          this.service.pass = pass;
          localStorage.clear();
          localStorage.setItem("idUtilizador", x['data']);
          localStorage.setItem("nome",utilizador);
          localStorage.setItem("pass", pass);
          this.router.navigate(['/Menu'])
          this.modalService.dismissAll(login);
        } else{
         alert("ERRO LOGIN");
        }
      }
      );
  }

  registoCriar(utilizador, pass, registo) {
    this.service.registo(utilizador, pass).subscribe((x) => {
        console.log(x);
        if (x['code'] == 200 ){
            this.router.navigate(['/Home'])
            this.modalService.dismissAll(registo);
       }else{
            alert("ERRO CRIAR");
        }
      }
      );
    }



}
