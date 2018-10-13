import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TituloComponent } from './components/titulo/titulo.component';
import { BuscaOutfitComponent } from './components/busca-outfit/busca-outfit.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'busca-outfit', component: BuscaOutfitComponent },
  { path: 'lista-sugerencias', component: ListaSugerenciasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: TituloComponent },
];

export const RoutingModule: ModuleWithProviders =
  RouterModule.forRoot(routes, { enableTracing: true }  );
