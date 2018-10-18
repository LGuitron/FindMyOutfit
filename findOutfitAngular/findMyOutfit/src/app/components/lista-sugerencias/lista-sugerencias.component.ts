import { Component, OnInit, NgZone } from '@angular/core';
import {Sugerencia} from '../../models/sugerencia';
import data from '../../../assets/json/sugerencias.json';
import {NavbarComponent} from '../navbar/navbar.component';
import { ClarifaiService } from '../../services/clarifai.service';
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

  constructor(private zone:NgZone, public rest: ClarifaiService, public transferService: ImageTransferService){ }
  ngOnInit()
  {

      this.sugerencias = new Array<Sugerencia>();
      this.sugerencias = data.sugerencias;
      // Get URL from transfer service and use Clarifai Service
      this.imageUrl         = this.transferService.getUrl();
      this.getTags();
  }

  getTags()
  {
        this.rest.getTags(this.imageUrl).subscribe(
      (data: any)=>
      {
          this.zone.run(() => {
            this.tags = data.outputs[0].data.concepts;
          });
      }
    );
  }
}
