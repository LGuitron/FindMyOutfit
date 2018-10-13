import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { ListaSugerenciasComponent } from './components/lista-sugerencias/lista-sugerencias.component';

@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    ListaSugerenciasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
