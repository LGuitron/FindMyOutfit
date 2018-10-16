import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import { ClarifaiService } from '../../services/clarifai.service';

@Component({
  selector: 'app-busca-outfit',
  templateUrl: './busca-outfit.component.html',
  styleUrls: ['./busca-outfit.component.scss']
})
export class BuscaOutfitComponent implements OnInit {

  constructor(public rest: ClarifaiService) { }

  ngOnInit() {
    this.rest.getTags('https://scstylecaster.files.wordpress.com/2014/10/skirt.png');

  }

}
