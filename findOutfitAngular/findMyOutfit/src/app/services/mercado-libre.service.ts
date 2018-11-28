import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreService {

  endpoint          = 'https://api.mercadolibre.com/sites/MLA/search';       // Endpoint for finding products by tag
  endpoint_picture  = 'https://api.mercadolibre.com/items/';       // Endpoint for getting high res image with product id

  constructor(private http: HttpClient) { }

  findItems(tag : string, maxAmount : number): Observable<any>
  {

      return this.http.get(this.endpoint + '?q=' + tag + '&limit=' + maxAmount).pipe(
        map(function(res){
          //console.log("MERCADO LIBRE API");
          //console.log(res);
          return res;
        }));
  }

  itemPicture(item_id : string): Observable<any>
  {

      return this.http.get(this.endpoint_picture + item_id).pipe(
        map(function(res){
          //console.log("HIGH RES IMAGE API");
          //console.log(res);
          return res;
        }));
  }
}
