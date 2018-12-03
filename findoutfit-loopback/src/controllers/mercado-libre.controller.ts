import {inject} from '@loopback/context';
import {get, param} from "@loopback/openapi-v3";

const axios = require('axios');

export class MercadoLibreController {
    
  constructor() {}
  
  @get('/api/mercadolibre/item/{tag}/{maxAmount}',{
      responses: {
                    '200': {
                description: 'Products successfully retrieved from MercadoLibre',
            }
        }     
    }) 
  async getItems(
    @param.path.string('tag') tag: string,
    @param.path.string('maxAmount') maxAmount: string,
  ): Promise<any> {
    var items = await axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + tag + '&limit=' + maxAmount);
    return items.data;
  }
  
  @get('/api/mercadolibre/image/{id}',{
       responses: {
                    '200': {
                description: 'Product image successfully retrieved from MercadoLibre',
            }
        }     
    })  
  async getImage(
    @param.path.string('id') id: string,
  ): Promise<any> {
    var image = await axios.get('https://api.mercadolibre.com/items/' + id);
    return image.data;
  }
}
