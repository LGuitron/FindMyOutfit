import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as Clarifai  from 'clarifai';

@Injectable({
  providedIn: 'root'
})
export class ClarifaiService {

  endpoint = 'https://api.clarifai.com/v2/models/e0be3b9d6a454f0493ac3a30784001ff/outputs';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Key 84a695c53e2f4b788b6863716a90d06b'
    })
  };

  constructor(private http: HttpClient) {}
  getTags(image_url) : Observable<any>
  {
      let request_body = {
                            "inputs": [
                              {
                                "data": {
                                  "image": {
                                    "url": image_url
                                  }
                                }
                              }
                            ]
                          };


      return this.http.post(this.endpoint, request_body, this.httpOptions).pipe(
        map(function(res){
          //console.log("CLARIFAI API");
          //console.log(res);
          return res;
        }));
  }
}
