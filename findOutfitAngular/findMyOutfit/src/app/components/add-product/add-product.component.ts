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

  // Counter for tags
  tagCounter : number;
  max_fields : number;
  sugerenciaForm : FormGroup;
  tags : FormArray;

  submitted : boolean;

  constructor(private formBuilder : FormBuilder, private http: HttpClient)
  {
    this.max_fields = 10;
    this.tagCounter = 1;
    this.createForm();
    this.submitted = false;
  }

  // Initialize JQuery for adding new tags
  ngOnInit() {}

  // TODO add validators for each field
  createForm()
  {
    this.sugerenciaForm = this.formBuilder.group(
    {
      name  : new FormControl(null, Validators.required),
      store : new FormControl(null, Validators.required),
      cost  : new FormControl(null, Validators.required),
      url_image : new FormControl(null, Validators.required),
      url_website : new FormControl(null, Validators.required),
      tags : this.formBuilder.array([this.createArrayItem(true),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false),
                                     this.createArrayItem(false)
                                    ])
    });
    console.log("FORM");
    console.log(this.sugerenciaForm);
  }

  // Create new items in array of tags
  createArrayItem(isRequired : boolean): FormGroup
  {
    if(isRequired)
      return this.formBuilder.group({tag: ['', Validators.required]});
    return this.formBuilder.group({tag: ''});
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


  // Function for allowing writing numbers only
    numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  // Upload form to database
  // TODO add id of the current user
  enviarFormulario()
  {
    if(!this.sugerenciaForm.valid){
  		console.log("Invalid Form");
      this.submitted = true;
  		return;
  	}

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
