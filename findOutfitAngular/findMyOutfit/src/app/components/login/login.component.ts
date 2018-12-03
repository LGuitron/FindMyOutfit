import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {Md5} from "md5-typescript";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Boolean for displaying text for login failure
  loginFailed : boolean;
  loginForm : FormGroup = new FormGroup({
 	email: new FormControl(null, [Validators.email, Validators.required]),
 	password: new FormControl(null, Validators.required)
  });

  constructor(private http: HttpClient, private router: Router) { }


  public isError = false;
  ngOnInit() {
  }

  login(){
  	if(!this.loginForm.valid){
  		console.log('Invalid');
  		this.isError = true;
  		setTimeout(() => {
  					this.isError = false;

  				}, 4000)
      
  		return;
  	}

  	var newJson = this.loginForm.value;


  	let request_body = {


								  "email": newJson.email,
								  "password": newJson.password,



                          };

  	this.http.post("http://localhost:5000/users/login", request_body).subscribe((response:any) => {
  			if(response.status.statusCode == 200){
  				var user_email = response.user;
          		var user_type  = response.type;
  				console.log(user_email);
  				localStorage.setItem("user_email", user_email);
          		localStorage.setItem("user_type", user_type);
          		this.isError = false;
          		this.router.navigate(['busca-outfit']);

  			}
        else{
        		
  				console.log("usuario no encontrado")
  					this.isError = true;
  				console.log("usuario no encontrado")
  				setTimeout(() => {
  					this.isError = false;

  				}, 4000)
  			
  			}
  		}, err => {


  		this.isError = true;
  				console.log("usuario no encontrado")
  				setTimeout(() => {
  					this.isError = false;

  				}, 4000)


      });



 }



}

