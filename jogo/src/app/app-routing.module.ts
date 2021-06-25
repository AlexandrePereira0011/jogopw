import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourofourComponent } from './components/fourofour/fourofour.component';
import { HomeComponent } from './components/home/home.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"Home",component:HomeComponent},
  {path:"Menu",component:MenuComponent},
  {path:"Jogo",component:JogoComponent},
  {path:"notFound", component:FourofourComponent},
  {path:"**",redirectTo: "notFound"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
