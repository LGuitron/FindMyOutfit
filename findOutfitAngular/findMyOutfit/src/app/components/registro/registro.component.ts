import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
 	email: new FormControl(null, [Validators.email, Validators.required]),
 	name: new FormControl(null, Validators.required),
 	lastname: new FormControl(null, Validators.required),
 	password: new FormControl(null, Validators.required),
 	cpass: new FormControl(null,Validators.required)
  })

  constructor() { }

  ngOnInit() {
  }

  register(){
  	if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
  		console.log("Invalid Form");
  		return;
  	}
  	console.log(JSON.stringify(this.registerForm.value));

  }

}
