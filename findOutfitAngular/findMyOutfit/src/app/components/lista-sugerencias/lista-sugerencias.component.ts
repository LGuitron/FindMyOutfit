import { Component, OnInit, NgZone } from '@angular/core';
import {Sugerencia} from '../../models/sugerencia';
import data from '../../../assets/json/sugerencias.json';
import {NavbarComponent} from '../navbar/navbar.component';
import { ClarifaiService } from '../../services/clarifai.service';
import { MercadoLibreService } from '../../services/mercado-libre.service';
import { ImageTransferService } from '../../services/image-transfer.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lista-sugerencias',
  templateUrl: './lista-sugerencias.component.html',
  styleUrls: ['./lista-sugerencias.component.scss']
})
export class ListaSugerenciasComponent implements OnInit {

  imageUrl : string;
  tags : Array<any>;
  sugerencias = new Array<Sugerencia>();

  constructor(private zone:NgZone, public clarifai: ClarifaiService, public transferService: ImageTransferService, public mercadoLibre: MercadoLibreService){ }
  ngOnInit()
  {

      //this.sugerencias = data.sugerencias;



      // Get URL from transfer service and use Clarifai Service
      this.imageUrl         = this.transferService.getUrl();
      this.getTags();

      // Set suggestions from our catalog based on tags obtained
      this.sugerencias = new Array<Sugerencia>();
      this.filterFromStore(data.sugerencias, ['tag1', 'tag2']);


      this.getClothesWithTag('women hat', 2);
  }

  getTags()
  {
        this.clarifai.getTags(this.imageUrl).subscribe(
      (data: any)=>
      {
          this.zone.run(() => {
            this.tags = data.outputs[0].data.concepts;
          });
      }
    );
  }

  // Append cloth suggestions from Mercado Libre to suggestions array
  getClothesWithTag(tag : string, maxAmount : number )
  {


      this.mercadoLibre.findItems(tag, maxAmount).subscribe((return_data: any) => {
          //this.clothes = return_data.results;
          var cloth_tags = new Array<string>();
          cloth_tags.push(tag);

          for(let cloth of return_data.results)
          {
            this.sugerencias.push(new Sugerencia(cloth.title,'Mercado Libre',cloth.price, cloth.thumbnail, cloth.permalink, cloth_tags));
          }
      });
  }

  // TODO
  // Append cloth suggestions from our own store
  // Only if tags placed on them are similar to tags returned by clarify
  filterFromStore(catalogo : Array<Sugerencia>, tags : Array<string>)
  {
    console.log("Verificar si hay coincidencia en tag de ropa para decidir si agregar los productos de nuestro catalogo");
    for(let sugerencia of catalogo)
    {
      // Comparar tags de clarifai y tags de sugerencia actual
      if(true)
      {
        this.sugerencias.push(sugerencia);
      }
      //  this.sugerencias.push(sugerencia);
    }
  }


}
