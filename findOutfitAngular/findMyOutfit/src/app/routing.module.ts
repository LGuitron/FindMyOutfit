import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BuscaOutfitComponent } from './components/busca-outfit/busca-outfit.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';

const routes: Routes = [
  { path: 'busca-outfit', component: BuscaOutfitComponent },
  { path: 'lista-sugerencias', component: ListaSugerenciasComponent },
  { path: '', component: BuscaOutfitComponent },

];

export const RoutingModule: ModuleWithProviders =
  RouterModule.forRoot(routes, { enableTracing: true }  );
