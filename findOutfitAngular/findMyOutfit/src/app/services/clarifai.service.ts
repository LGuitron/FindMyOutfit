import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as Clarifai  from 'clarifai';
import externalApis from '../../assets/json/externalApis.json';

@Injectable({
  providedIn: 'root'
})
export class ClarifaiService {

  endpoint = externalApis.clarifai;

  constructor(private http: HttpClient) {}
  getTags(image_url) : Observable<any>
  {
      let request_body = {"url": image_url};
      return this.http.post(this.endpoint, request_body).pipe(
        map(function(res){
          return res;
        }));
  }
}
