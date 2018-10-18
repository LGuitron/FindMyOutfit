import { Injectable } from '@angular/core';
import { Observable, empty, of } from 'rxjs';
import * as Clarifai  from 'clarifai';

@Injectable({
  providedIn: 'root'
})
export class ClarifaiService {

  constructor() {

  }

  getTags(image_url) : Observable<any>{

      // predict the contents of an image by passing in a url
     var app = new Clarifai.App({
        apiKey: '84a695c53e2f4b788b6863716a90d06b'
      });

     app.models.predict( Clarifai.APPAREL_MODEL, image_url).then(
      function(response) {
        console.log("CLARIFAI API PREDICTION");
        console.log(response);
        return response;
      },
      function(err) {
        console.error(err);
        return empty();
      }
    );
     //return new EmptyObservable<Response>();
     return empty();
  }
}
