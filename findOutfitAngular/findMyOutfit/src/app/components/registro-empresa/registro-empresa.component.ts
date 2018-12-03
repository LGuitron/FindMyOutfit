import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {Md5} from "md5-typescript";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss']
})
export class RegistroEmpresaComponent implements OnInit {

  registerCompanyForm:FormGroup = new FormGroup({
 	email: new FormControl(null, [Validators.email, Validators.required]),
 	name: new FormControl(null, Validators.required),
 	last_names: new FormControl(null, Validators.required),
 	company: new FormControl(null, Validators.required),
 	company_role: new FormControl(null, Validators.required),
 	description: new FormControl(null, Validators.required),
 	password: new FormControl(null, Validators.required),
 	cpass: new FormControl(null,Validators.required),
 	type: new FormControl('company')
  })

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
  }



   registerCompany(){
  	if(!this.registerCompanyForm.valid || (this.registerCompanyForm.controls.password.value != this.registerCompanyForm.controls.cpass.value)){
  		console.log("Invalid Form");
  		return;
  	}

  	var newJson = this.registerCompanyForm.value;
  	delete newJson['cpass'];





  	let request_body = {

                  "name": newJson.name,
								  "last_names": newJson.last_names,
								  "email": newJson.email,
								  "password": Md5.init(newJson.password),
								  "type": newJson.type,
								  "company": newJson.company,
								  "description": newJson.description,
								  "company_role": newJson.company_role,


                          };


 	console.log(request_body);
 	console.log(internalApis.users);




  	this.http.post(internalApis.users, request_body).subscribe((response:any) => {
  			var user_email = response.email;
          		var user_type  = response.type;
  				console.log(user_email);
  				console.log(user_type);
  				localStorage.setItem("user_email", user_email);
          		localStorage.setItem("user_type", user_type);
 			this.router.navigate(['busca-outfit']);
  		}, err => {
      });



  }

}
