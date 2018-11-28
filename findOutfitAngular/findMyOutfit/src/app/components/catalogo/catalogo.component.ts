import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Sugerencia} from '../../models/sugerencia'
import data from '../../../assets/json/sugerencias.json';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {



  sugerencias = new Array<Sugerencia>();
  constructor()
  {
    this.sugerencias = data.sugerencias;
  }

  ngOnInit() {
  }

  // Function for displaying price with 2 decimal places
  setTwoNumberDecimal(price: number) : string
  {
    return Math.round((price * 100) / 100).toFixed(2);
  }

}
