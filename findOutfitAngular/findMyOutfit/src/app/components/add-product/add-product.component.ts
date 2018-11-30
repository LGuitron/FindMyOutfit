import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Sugerencia} from '../../models/sugerencia'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  sugerenciaModel = new Sugerencia("adca"," ",0," "," ",[" "," "]);
  sugerenciaForm = new FormGroup({name : new FormControl(),
                                  store : new FormControl(),
                                  cost : new FormControl(),
                                  url_image : new FormControl(),
                                  url_website : new FormControl(),
                                  tags : new FormControl()
                                });

  constructor(private formBuilder : FormBuilder)
  {
    this.createForm();
  }

  ngOnInit() {
  }

  // TODO add validators for each field
  createForm()
  {
    this.sugerenciaForm = this.formBuilder.group(
    {
      name  : new FormControl(),
      store : new FormControl(),
      cost  : new FormControl(),
      url_image : new FormControl(),
      url_website : new FormControl(),
      tags : new FormControl(),
    }
    );
  }

  // Upload form to database
  enviarFormulario()
  {
    let forma = this.sugerenciaForm.value;
    console.log(forma);
    this.sugerenciaModel.name          = forma.name;
    this.sugerenciaModel.store         = forma.store;
    this.sugerenciaModel.cost          = forma.cost;
    this.sugerenciaModel.url_image     = forma.url_image;
    this.sugerenciaModel.url_website   = forma.url_website;
    this.sugerenciaModel.tags          = forma.tags;
  }
}
