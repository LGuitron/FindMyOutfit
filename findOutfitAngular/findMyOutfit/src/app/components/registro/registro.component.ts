import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {Md5} from "md5-typescript";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
 	email: new FormControl(null, [Validators.email, Validators.required]),
 	name: new FormControl(null, Validators.required),
 	last_names: new FormControl(null, Validators.required),
 	password: new FormControl(null, Validators.required),
 	cpass: new FormControl(null,Validators.required),
 	type: new FormControl('user')
  })

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  register(){
  	if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
  		console.log("Invalid Form");
  		return;
  	}

  	var newJson = this.registerForm.value;
  	delete newJson['cpass'];



  	let request_body = {

                  "name": newJson.name,
								  "last_names": newJson.last_names,
								  "email": newJson.email,
								  "password": Md5.init(newJson.password),
								  "type": newJson.type,

                          };


  	 console.log(request_body);
 	console.log(internalApis.users);

 	this.http.post(internalApis.users, request_body).subscribe(response => {

  		}, err => {
      });

  }

}
