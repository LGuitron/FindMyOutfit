// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/context';
import {get, param} from "@loopback/openapi-v3";

var meli = require('mercadolibre');
var meliObject = new meli.Meli();

export class MercadoLibreController {
    
  constructor() {}
  
  @get('/mercadolibre/item/{tag}/{maxAmount}') 
  async getItems(
    @param.path.string('tag') tag: string,
    @param.path.string('maxAmount') maxAmount: string,
  ): Promise<any> {
    const items = await meliObject.get('sites/MLA/search?q=' + tag + '&limit=' + maxAmount , 
        function (err : any, res : any) {
            console.log(res);
    });
    return items;
  }
}
