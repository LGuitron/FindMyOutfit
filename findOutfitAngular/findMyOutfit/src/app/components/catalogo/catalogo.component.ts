import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Sugerencia} from '../../models/sugerencia';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import internalApis from '../../../assets/json/internalApis.json';
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  user_email : string;                          // Email of the logged user
  user_type : string;
  sugerencias = new Array<Sugerencia>();

  constructor(private http: HttpClient, private router: Router)
  {
      this.user_email = localStorage.getItem("user_email");
      this.user_type = localStorage.getItem("user_type");

      // Block access to non company users
      if(this.user_email == null || this.user_type != "company")
        this.router.navigate(['']);

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
