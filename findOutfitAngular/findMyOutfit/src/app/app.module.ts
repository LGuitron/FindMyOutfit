import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';
import { BuscaOutfitComponent } from './components/busca-outfit/busca-outfit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoutingModule } from './routing.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { EditarProfileComponent } from './components/editar-profile/editar-profile.component';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';


//Servicios

import { AuthService } from './services/auth.service';


import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistroEmpresaComponent } from './components/registro-empresa/registro-empresa.component';


@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    ListaSugerenciasComponent,
    BuscaOutfitComponent,
    NavbarComponent,
    EditarProfileComponent,
    CatalogoComponent,
    AddProductComponent,
    LoginComponent,
    RegistroComponent,
    RegistroEmpresaComponent,


  ],
  imports: [
    FormsModule,
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
