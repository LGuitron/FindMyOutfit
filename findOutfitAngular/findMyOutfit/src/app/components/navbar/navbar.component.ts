import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user_email : string;                          // Email of the logged user

  constructor(private auth:AuthService) {
    this.user_email = localStorage.getItem("user_email");
    console.log("USER: " + this.user_email);
  }

  ngOnInit() {
  	console.log("HOLA (AUTH)" + this.auth.userProfile);
  }

  salir(){
    localStorage.clear();
  	this.auth.logout();
  }

}
