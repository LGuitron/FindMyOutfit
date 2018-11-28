import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TituloComponent } from './components/titulo/titulo.component';
import { BuscaOutfitComponent } from './components/busca-outfit/busca-outfit.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';
import { EditarProfileComponent } from './components/editar-profile/editar-profile.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  { path: 'busca-outfit', component: BuscaOutfitComponent },
  { path: 'lista-sugerencias', component: ListaSugerenciasComponent },
  { path: '', component: TituloComponent },
  { path: 'profile', component: EditarProfileComponent },
  { path: 'catalog', component: CatalogoComponent },
  { path: 'add-product', component: AddProductComponent }
];

export const RoutingModule: ModuleWithProviders =
  RouterModule.forRoot(routes, { enableTracing: true }  );
