import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Sugerencia} from '../../models/sugerencia'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import internalApis from '../../../assets/json/internalApis.json';
import * as $ from 'jquery';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  user_email : string;                          // Email of the logged user
  sugerencias = new Array<Sugerencia>();

  constructor(private http: HttpClient)
  {
      this.user_email = localStorage.getItem("user_email");
      this.http.get(internalApis.suggestions).subscribe((catalogo: any)=>{
          for (let sugerencia of catalogo)
          {
            if(sugerencia.user_id == this.user_email)
            {
              this.sugerencias.push(sugerencia);
            }
          }
      });
  }

  ngOnInit() {
  }

  // Function for deleting specific product from MongoDB
  delete_product(id : string)
  {
    this.http.delete(internalApis.suggestions + "/" + id).subscribe(response =>
    {$("#"+id).remove();},
    err => {});
  }

  // Function for displaying price with 2 decimal places
  setTwoNumberDecimal(price: number) : string
  {
    return Math.round((price * 100) / 100).toFixed(2);
  }

}
