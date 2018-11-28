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

  sugerenciaModel = new Sugerencia("a","b",5,"d","e",["f","g"]);
  sugerenciaForm = new FormGroup({nombre : new FormControl(),
                                  tienda : new FormControl(),
                                  costo : new FormControl(),
                                  url_imagen : new FormControl(),
                                  url_sitioweb : new FormControl(),
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
      name   : new FormControl(),
      tienda : new FormControl(),
      costo  : new FormControl(),
      url_imagen : new FormControl(),
      url_sitioweb : new FormControl(),
      tags : new FormControl(),
    }
    );
  }

  // Upload form to database
  enviarFormulario()
  {
    let forma = this.sugerenciaForm.value;
    console.log(forma);
    this.sugerenciaModel.nombre        = forma.nombre;
    this.sugerenciaModel.tienda        = forma.tienda;
    this.sugerenciaModel.costo         = forma.costo;
    this.sugerenciaModel.url_imagen    = forma.url_imagen;
    this.sugerenciaModel.url_sitioweb  = forma.url_sitioweb;
    this.sugerenciaModel.tags          = forma.tags;
  }
}
