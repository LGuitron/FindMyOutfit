import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {Md5} from "md5-typescript";
import {Router} from "@angular/router";
//import {FacegoogleService} from '../../services/facegoogle.service';
//import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider , AuthService } from "angular-6-social-login";

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

  //constructor(private http: HttpClient, private router: Router, public authService: FacegoogleService) { }
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


   /*public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        console.log(userData.email);

        // GET USER INFO FROM DATABASE IF USER EXISTS
          this.http.get("http://localhost:5000/users/" + userData.email).subscribe((response:any) => {
              console.log("RESP: " + response);
              localStorage.setItem("user_email", response.email);
              localStorage.setItem("user_type", response.type);
              this.router.navigate(['busca-outfit']);
          },

          // CREATE NEW REGISTER IN DB IF USER DOES NOT EXIST
          err => {
            console.log("CREATE NEW");

              	let request_body = {
                                      "name": userData.name,
                                      "email": userData.email,
                                      "type": "user",
                                    };

              this.http.post(internalApis.users, request_body).subscribe((response:any) => {
                      var user_email = response.email;
                      var user_type  = response.type;
                      console.log(user_email);
                      console.log(user_type);
                      localStorage.setItem("user_email", user_email);
                      localStorage.setItem("user_type", user_type);
                      this.router.navigate(['busca-outfit']);
                      }, err => {
                      this.isError = true;
                      setTimeout(() => {
                            this.isError = false;

                          }, 4000)
                      });
          });
      }
    );
   }*/
}

