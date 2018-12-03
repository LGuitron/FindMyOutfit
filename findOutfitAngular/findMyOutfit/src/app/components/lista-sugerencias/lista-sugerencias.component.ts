import { Component, OnInit, NgZone } from '@angular/core';
import {Sugerencia} from '../../models/sugerencia';
import externalApis from '../../../assets/json/externalApis.json';
import internalApis from '../../../assets/json/internalApis.json';
import {NavbarComponent} from '../navbar/navbar.component';
import { ClarifaiService } from '../../services/clarifai.service';
import { MercadoLibreService } from '../../services/mercado-libre.service';
import { ImageTransferService } from '../../services/image-transfer.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {trigger, state,style,animate,transition} from '@angular/animations';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-lista-sugerencias',
  templateUrl: './lista-sugerencias.component.html',
  styleUrls: ['./lista-sugerencias.component.scss'],
  animations: [
    trigger('popOverState',[
      state('show',style({
        opacity: 1
    })),
    state('hide',style({
      opacity: 0
    })),
    transition('show => hide',animate('600ms ease-out')),
    transition('hide => show',animate('1000ms ease-in'))
  ])
  ]
})
export class ListaSugerenciasComponent implements OnInit {


  imageUrl : string;
  user_email : string;                          // Email of the logged user
  tags : Array<any>;
  sugerencias = new Array<Sugerencia>();

  mercadoLibreSuggestions = 21;                 // Max number of suggestions to receive from Mercado Libre
  probability_exponent    =  3;                 // Variable to favor tags with higher probabilities
  items_per_tag = [];
  display_tags  = new Array<boolean>();         // Boolean array to set the tags to be displayed

  //animations
  show = false;
  get stateName(){
    return this.show ? 'show' : 'hide'
  }

  toggle(){
    this.show = !this.show;
  }


  constructor(private zone:NgZone, public clarifai: ClarifaiService, public transferService: ImageTransferService, public mercadoLibre: MercadoLibreService, private http: HttpClient){
  }
  ngOnInit()
  {
      this.user_email = localStorage.getItem("user_email");
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
      // Get all suggestions from DB (catalog)
      this.http.get(internalApis.suggestions).subscribe((catalogo: any)=>{
          this.getTags(catalogo);
      });
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
            if(this.user_email!=null)
              this.uploadTagsToUser();
            this.getClothesWithTag();
            this.filterFromStore(catalogo);
          });
      }
    );
  }

  // Function for uploading user tags to user's history
  // TODO do this for the current user
  uploadTagsToUser()
  {
      this.http.get(internalApis.users + "/"+ this.user_email).subscribe((usuario: any)=>{

        var tagArray : Array<string> = new Array<string>();

        // Check if tag array exists
        if(typeof usuario.tag_history !== 'undefined'){
          tagArray = usuario.tag_history;
        }

        var i = 0;
        for (let tag of this.tags)
        {
          if(this.display_tags[i])
            tagArray.push(tag.name);
          i += 1;
        }
        usuario.tag_history = tagArray;
        this.http.patch(internalApis.users + "/" + this.user_email, usuario).subscribe(response =>
        {},
        err => {});
      });
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
          //this.mercadoLibre.findItems(tag, parseInt(item_amount)).subscribe((return_data: any) => {

          // REQUEST TO EXTERNAL API WITH LOOPBACK//
          this.http.get(externalApis.mercadolibre + "/" +  tag + "/" + parseInt(item_amount)).subscribe((return_data: any) => {
              var cloth_tags = new Array<string>();
              cloth_tags.push(tag);

              for(let cloth of return_data.results)
              {
                  //get high res image link for each cloth
                  //this.mercadoLibre.itemPicture(cloth.id).subscribe((item_data: any) => {

                  // REQUEST TO EXTERNAL API WITH LOOPBACK//
                  this.http.get(externalApis.mercadolibre_image + "/" + cloth.id).subscribe((item_data: any) => {
                      let image_url   = item_data.pictures[0].secure_url;
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
    // Check all suggestions in the catalog
    for(let sugerencia of catalogo)
    {
      let foundMatch : boolean = false;

      // Check all tags found from clarifai service currently displayed
      let i = 0;
      for(let tag of this.tags)
      {
          if(this.display_tags[i])
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
          i++;
      }
    }
  }

  // Function for displaying price with 2 decimal places
  setTwoNumberDecimal(price: number) : string
  {
    return Math.round((price * 100) / 100).toFixed(2);
  }
}
