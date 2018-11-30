import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  login(){
  	if(!this.loginForm.valid){
  		console.log('Invalid');
  		return;
  	}
  	console.log(JSON.stringify(this.loginForm.value));
  }


}
