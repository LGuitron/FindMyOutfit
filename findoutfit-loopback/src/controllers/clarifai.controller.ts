import {inject} from '@loopback/context';
import {post, requestBody} from "@loopback/openapi-v3";

const axios = require('axios');

export class ClarifaiController {
    
    
  endpoint = 'https://api.clarifai.com/v2/models/e0be3b9d6a454f0493ac3a30784001ff/outputs';

  headers = {
                'Content-Type':  'application/json',
                'Authorization': 'Key 84a695c53e2f4b788b6863716a90d06b'
            };

  constructor() {}

  @post('/api/clarifai') 
  async getTags(@requestBody() data: any): Promise<any> {
    var items = await axios.post(this.endpoint, data, {headers:this.headers});
    return items.data;
  }
}
