import { Injectable } from '@angular/core';
import * as Clarifai  from 'clarifai'

@Injectable({
  providedIn: 'root'
})
export class ClarifaiService {

  constructor() {

  }

  getTags(image_url) {

      // predict the contents of an image by passing in a url
     var app = new Clarifai.App({
        apiKey: '84a695c53e2f4b788b6863716a90d06b'
      });

     app.models.predict( Clarifai.APPAREL_MODEL, image_url).then(
      function(response) {
        console.log("RESULT CLARIFAI QUERY");
        console.log(response);
      },
      function(err) {
        console.error(err);
      }
    );
  }

}
