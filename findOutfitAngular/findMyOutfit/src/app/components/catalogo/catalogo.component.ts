import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Sugerencia} from '../../models/sugerencia'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import internalApis from '../../../assets/json/internalApis.json';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  sugerencias = new Array<Sugerencia>();
  constructor(private http: HttpClient)
  {
      this.http.get(internalApis.suggestions).subscribe((catalogo: any)=>{
          this.sugerencias = catalogo;
      });
  }

  ngOnInit() {
  }

  // Function for displaying price with 2 decimal places
  setTwoNumberDecimal(price: number) : string
  {
    return Math.round((price * 100) / 100).toFixed(2);
  }

}
