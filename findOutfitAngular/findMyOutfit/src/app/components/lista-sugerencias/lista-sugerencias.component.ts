import { Component, OnInit } from '@angular/core';
import {Sugerencia} from '../../models/sugerencia';
import data from '../../../assets/json/sugerencias.json';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-lista-sugerencias',
  templateUrl: './lista-sugerencias.component.html',
  styleUrls: ['./lista-sugerencias.component.scss']
})
export class ListaSugerenciasComponent implements OnInit {

  sugerencias = new Array<Sugerencia>();

  constructor()
  {
    this.sugerencias = new Array<Sugerencia>();
    this.sugerencias = data.sugerencias;
  }

  ngOnInit() {
  }

}
