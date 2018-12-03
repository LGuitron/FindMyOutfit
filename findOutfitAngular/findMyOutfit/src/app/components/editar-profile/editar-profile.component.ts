import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {FormGroup, FormControl, FormBuilder, FormArray , Validators} from '@angular/forms';
import internalApis from '../../../assets/json/internalApis.json';
import {Router} from "@angular/router";

@Component({
  selector: 'app-editar-profile',
  templateUrl: './editar-profile.component.html',
  styleUrls: ['./editar-profile.component.scss']
})
export class EditarProfileComponent implements OnInit {

  user_email : string;
  user_type : string;

  user_name : string;
  user_lastnames : string;

  // Values to display in the form
  usuario : any;
  profileForm : FormGroup;

  // Boolean for successful update
  submitted : boolean;
  successUpdate : boolean;


   constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) {
      this.submitted = false;
      this.successUpdate = false;
      this.user_email = localStorage.getItem("user_email");
      this.user_type = localStorage.getItem("user_type");

      // Block access to non users
      if(this.user_email == null)
        this.router.navigate(['']);

      this.http.get(internalApis.users + "/"+ this.user_email).subscribe((usuario: any)=>{
        this.usuario = usuario;
        this.user_name = usuario.name;
        this.user_lastnames = usuario.last_names;
        this.createForm();
      })
   }



  createForm()
  {
    this.profileForm = this.formBuilder.group(
    {
      name  : new FormControl(this.user_name, Validators.required),
      last_names : new FormControl(this.user_lastnames, Validators.required)
    });
  }

    ngOnInit() {}

    enviarFormulario()
    {
      if(!this.profileForm.valid){
        console.log("Invalid Form");
        this.successUpdate = false;
        this.submitted = true;
        return;
      }
      var jsonSubmit = this.profileForm.value;

      this.usuario.name = jsonSubmit.name;
      this.usuario.last_names = jsonSubmit.last_names;

      this.http.patch(internalApis.users + "/" + this.user_email, this.usuario).subscribe(response =>
        {this.successUpdate = true; this.submitted = true;},
        err => {});
    }

  }
