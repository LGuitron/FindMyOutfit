import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';
import { BuscaOutfitComponent } from './components/busca-outfit/busca-outfit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoutingModule } from './routing.module';

import { EditarProfileComponent } from './components/editar-profile/editar-profile.component';


//Servicios

import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    ListaSugerenciasComponent,
    BuscaOutfitComponent,
    NavbarComponent,
    EditarProfileComponent,
    

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
