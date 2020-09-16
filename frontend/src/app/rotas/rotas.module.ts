import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ListaVeiculoComponent} from '../componentes/lista-veiculo/lista-veiculo.component';
import {EdicaoVeiculoComponent} from '../componentes/edicao-veiculo/edicao-veiculo.component';
import {TelaPrincipalComponent} from './tela-principal/tela-principal.component';


const rotas: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'principal'},
  {path: 'principal', component: TelaPrincipalComponent},
  {path: 'lista', component: ListaVeiculoComponent},
  {path: 'novo', component: EdicaoVeiculoComponent},
  {path: 'edicao/:id', component: EdicaoVeiculoComponent}
];


@NgModule({
  declarations: [TelaPrincipalComponent],
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule, TelaPrincipalComponent]
})
export class RotasModule {
}
