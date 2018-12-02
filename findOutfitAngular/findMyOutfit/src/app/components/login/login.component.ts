import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {Md5} from "md5-typescript";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({
 	email: new FormControl(null, [Validators.email, Validators.required]),
 	password: new FormControl(null, Validators.required)
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(){
  	if(!this.loginForm.valid){
  		console.log('Invalid');
  		return;
  	}

  	var newJson = this.loginForm.value;

  	
  	let request_body = {

             
								  "email": newJson.email,
								  "password": newJson.password,
								


                          };


  	this.http.post("http://localhost:5000/users/login", request_body).subscribe(response => {
  			console.log(response);
  			if(response.status.statusCode == 200){
  				var user_email = response.user;
  				console.log(user_email);
  				localStorage.setItem("user_email", user_email);
  			}else{
  				console.log("usuario no encontrado")
  			}
  		

  		}, err => {
      });


  
 }



}

