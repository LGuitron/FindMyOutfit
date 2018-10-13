import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';
import { BuscaOutfitComponent } from './components/busca-outfit/busca-outfit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoutingModule } from './routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    ListaSugerenciasComponent,
    BuscaOutfitComponent,
    NavbarComponent
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
