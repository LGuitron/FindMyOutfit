import {inject} from '@loopback/context';
import {post, requestBody} from "@loopback/openapi-v3";
import {ClarifaiInput} from '../models';

const axios = require('axios');

export class ClarifaiController {
    
    
  endpoint = 'https://api.clarifai.com/v2/models/e0be3b9d6a454f0493ac3a30784001ff/outputs';

  headers = {
                'Content-Type':  'application/json',
                'Authorization': 'Key 84a695c53e2f4b788b6863716a90d06b'
            };

  constructor() {}

  @post('/api/clarifai',{
     responses: {
                    '200': {
                description: 'Obtained image information successfully',
            }
        }
    }) 
  async getTags(@requestBody() data: ClarifaiInput): Promise<any> {
    
    let request_body = {
                        "inputs": [
                            {
                            "data": {
                                "image": {
                                "url": data.url
                                }
                            }
                            }
                        ]
                        };
    var items = await axios.post(this.endpoint, request_body, {headers:this.headers});
    return items.data;
  }
}
