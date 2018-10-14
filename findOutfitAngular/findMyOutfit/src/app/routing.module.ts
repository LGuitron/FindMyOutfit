import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TituloComponent } from './components/titulo/titulo.component';
import { BuscaOutfitComponent } from './components/busca-outfit/busca-outfit.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';
import { EditarProfileComponent } from './components/editar-profile/editar-profile.component';


const routes: Routes = [
  { path: 'busca-outfit', component: BuscaOutfitComponent },
  { path: 'lista-sugerencias', component: ListaSugerenciasComponent },
  { path: '', component: TituloComponent },
  { path: 'profile', component: EditarProfileComponent },
  
];

export const RoutingModule: ModuleWithProviders =
  RouterModule.forRoot(routes, { enableTracing: true }  );
