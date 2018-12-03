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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Servicios

import { AuthService } from './services/auth.service';
import { FacegoogleService } from './services/facegoogle.service';

import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AddProductComponent } from './components/add-product/add-product.component';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistroEmpresaComponent } from './components/registro-empresa/registro-empresa.component';

import { MyProfileComponent } from './components/my-profile/my-profile.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { getAuthServiceConfigs } from "./socialloginConfig";
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from "angular-6-social-login";

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
    MyProfileComponent


  ],
  imports: [
    FormsModule,
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SocialLoginModule,
  ],
  providers: [AuthService, FacegoogleService,
              {
                provide: AuthServiceConfig,
                useFactory: getAuthServiceConfigs
              }
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
