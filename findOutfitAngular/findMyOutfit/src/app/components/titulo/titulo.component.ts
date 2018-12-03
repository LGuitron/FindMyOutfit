import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  user_email : string;                          // Email of the logged user
  user_name : string;


  constructor(private http: HttpClient, private auth:AuthService) {
  	auth.handleAuthentication();
    this.getUserName();
  }

  ngOnInit() {

  }

  login(){
  	this.auth.login();
  }


  getUserName()
  {
    this.user_email = localStorage.getItem("user_email");
    this.http.get(internalApis.users + "/"+ this.user_email).subscribe((usuario: any)=>{
        this.user_name = usuario.name;
    });
  }


}
