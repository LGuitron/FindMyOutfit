import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user_email : string;                          // Email of the logged user
  user_type : string;

  constructor(private auth:AuthService) {
    this.user_email = localStorage.getItem("user_email");
    this.user_type = localStorage.getItem("user_type");
  }

  ngOnInit() {
  	console.log("HOLA (AUTH)" + this.auth.userProfile);
  }

  salir(){
    localStorage.clear();
  	this.auth.logout();
  }

}
