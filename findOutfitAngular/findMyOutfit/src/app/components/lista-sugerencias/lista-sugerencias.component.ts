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

  mercadoLibreSuggestions = 21;           // Max number of suggestions to receive from Mercado Libre
  probability_exponent    =  3;           // Variable to favor tags with higher probabilities

  items_per_tag = [];
  display_tags  = new Array<boolean>();         // Boolean array to set the tags to be displayed

  constructor(private zone:NgZone, public clarifai: ClarifaiService, public transferService: ImageTransferService, public mercadoLibre: MercadoLibreService){ }
  ngOnInit()
  {
      this.imageUrl = this.transferService.getUrl();

      // If page was refreshed get url from local storage
      if(typeof this.imageUrl === "undefined")
      {
        this.imageUrl = localStorage.getItem('imageUrl');
      }

      // Save url requested into local storage
      else
      {
        localStorage.setItem('imageUrl', this.imageUrl);
      }

      // Use Clarifai Service
      this.getTags();

      // Set suggestions from our catalog based on tags obtained
      this.sugerencias = new Array<Sugerencia>();
      this.filterFromStore(data.sugerencias, ['tag1', 'tag2']);

      //this.getClothesWithTag('women hat', 2);
  }

  getTags()
  {
      this.clarifai.getTags(this.imageUrl).subscribe(
      (data: any)=>
      {
          this.zone.run(() => {
            this.tags = data.outputs[0].data.concepts;

            // When the tags have been returned use them to find clothes
            this.getItemsPerTag();
            this.getClothesWithTag()
          });
      }
    );
  }

  getItemsPerTag()
  {
      // Calculate sum of all tag probabilities
      let totalSum = 0;
      for(let tag of this.tags)
      {
        totalSum += Math.pow(tag.value, this.probability_exponent);
      }

      // Calculate amount of items to find per each Tag
      for(let tag of this.tags)
      {
        this.items_per_tag.push(Math.round(Math.pow(tag.value, this.probability_exponent)*this.mercadoLibreSuggestions/totalSum));
        this.display_tags.push(this.items_per_tag[this.items_per_tag.length-1] > 0);
        //console.log("Tag: " + tag.name);
        //console.log("#: " + this.items_per_tag[this.items_per_tag.length-1]);
      }
  }



  // Append cloth suggestions from Mercado Libre to suggestions array
  getClothesWithTag()
  {
      //for(let tag of this.tags)
      for(var i = 0; i < this.tags.length; i++)
      {
        let item_amount = this.items_per_tag[i];
        if(item_amount > 0)
        {
          let tag = this.tags[i].name;
          this.mercadoLibre.findItems(tag, parseInt(item_amount)).subscribe((return_data: any) => {
              var cloth_tags = new Array<string>();
              cloth_tags.push(tag);

              for(let cloth of return_data.results)
              {
                  //get high res image link for each cloth
                  this.mercadoLibre.itemPicture(cloth.id).subscribe((item_data: any) => {
                      let image_url   = item_data.pictures[0].secure_url;
                      let cloth_price = Math.round((parseFloat(cloth.price) * 100) / 100).toFixed(2);
                      this.sugerencias.push(new Sugerencia(cloth.title,'Mercado Libre',cloth_price, image_url, cloth.permalink, cloth_tags));
                  });
              }
          });
        }
      }
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
        console.log("add logic here");
        //sugerencia.costo = Math.round((parseFloat(sugerencia.costo) * 100) / 100).toFixed(2);
        //this.sugerencias.push(sugerencia);
      }
      //  this.sugerencias.push(sugerencia);
    }
  }


}
