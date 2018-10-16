import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService) {

  }

  ngOnInit() {
  	console.log("HOLA (AUTH)" + this.auth.userProfile);
  }

  salir(){
  	this.auth.logout();
  }

}
