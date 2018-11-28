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


      // Set suggestions from our catalog based on tags obtained
      this.sugerencias = new Array<Sugerencia>();

      // Use Clarifai Service
      this.getTags(data.sugerencias);

      //this.filterFromStore(data.sugerencias, ['tag1', 'tag2']);

      //this.getClothesWithTag('women hat', 2);
  }

  getTags(catalogo : Array<Sugerencia>)
  {
      this.clarifai.getTags(this.imageUrl).subscribe(
      (data: any)=>
      {
          this.zone.run(() => {
            this.tags = data.outputs[0].data.concepts;

            // When the tags have been returned use them to find clothes
            this.getItemsPerTag();
            this.getClothesWithTag();
            this.filterFromStore(catalogo);
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
                      //let cloth_price = Math.round((parseFloat(cloth.price) * 100) / 100).toFixed(2);
                      let cloth_price = Math.round((parseFloat(cloth.price) * 100) / 100);

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
  filterFromStore(catalogo : Array<Sugerencia>)
  {
    console.log("Verificar si hay coincidencia en tag de ropa para decidir si agregar los productos de nuestro catalogo");

    // Check all suggestions in the catalog
    for(let sugerencia of catalogo)
    {
      console.log(sugerencia);
      let foundMatch : boolean = false;

      // Check all tags found from clarifai service
      for(let tag of this.tags)
      {

          // Check all of the tags for the current item
          for (let current_item_tag of sugerencia.tags)
          {
              // Comparar tags de clarifai y tags de sugerencia actual
              if(tag.name.toLowerCase().includes(current_item_tag.toLowerCase()))
              {
                this.sugerencias.push(sugerencia);
                foundMatch = true;
                break;
              }
          }
          if(foundMatch)
            break;
      }
      //  this.sugerencias.push(sugerencia);
    }
  }


  // Function for displaying price with 2 decimal places
  setTwoNumberDecimal(price: number) : string
  {
    return Math.round((price * 100) / 100).toFixed(2);
  }
}
