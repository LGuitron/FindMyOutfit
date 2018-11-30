import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormGroup, FormControl, FormBuilder, FormArray , Validators} from '@angular/forms';
import {Sugerencia} from '../../models/sugerencia'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import internalApis from '../../../assets/json/internalApis.json';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  sugerenciaModel = new Sugerencia("adca"," ",0," "," ",[" "," "]);

  // Counter for tags
  tagCounter : number;
  max_fields : number;
  sugerenciaForm : FormGroup;
  tags : FormArray;

  constructor(private formBuilder : FormBuilder, private http: HttpClient)
  {
    this.max_fields = 10;
    this.tagCounter = 1;
    this.createForm();
  }

  // Initialize JQuery for adding new tags
  ngOnInit() {}

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
      tags : this.formBuilder.array([this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem(),
                                     this.createArrayItem()
                                    ])
    });
    console.log(this.sugerenciaForm.controls.tags);
  }

  // Create new items in array of tags
  createArrayItem(): FormGroup
  {
    return this.formBuilder.group({
      tag: ''
    });
  }

  // Function for adding more tag items
  add_new_tag()
  {
    if(this.tagCounter < this.max_fields)
    {
      this.tagCounter++;
    }
  }

  // Function or removing last tag in the list
  remove_last_tag()
  {
    this.tagCounter--;
  }


  // Upload form to database
  // TODO add id of the current user
  enviarFormulario()
  {
    var jsonSubmit = this.sugerenciaForm.value;
    var tagArray : Array<string> = new Array<string>();

    // Convert to normal string array
    for (let entry of jsonSubmit.tags)
    {
      if(entry.tag!="")
        tagArray.push(entry.tag);
    }
    jsonSubmit.tags = tagArray;

    // Convert cost to number
    jsonSubmit.cost = +jsonSubmit.cost;

    // Add id of company uploading the product
    jsonSubmit.user_id = "legl_1995@hotmail.com";

    this.http.post(internalApis.suggestions, jsonSubmit).subscribe(response =>
      {},
      err => {});
  }
}
