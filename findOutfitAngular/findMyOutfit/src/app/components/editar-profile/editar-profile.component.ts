import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {FormGroup, FormControl, FormBuilder, FormArray , Validators} from '@angular/forms';
import internalApis from '../../../assets/json/internalApis.json';

@Component({
  selector: 'app-editar-profile',
  templateUrl: './editar-profile.component.html',
  styleUrls: ['./editar-profile.component.scss']
})
export class EditarProfileComponent implements OnInit {

	profile: any;
  user_email : string;
  user_type : string;

  // Values to display in the form
  user_name : string
  user_lastnames : string;

  profileForm : FormGroup;

   constructor(private auth:AuthService, private http: HttpClient) {
      this.user_email = localStorage.getItem("user_email");
      this.user_type = localStorage.getItem("user_type");

      this.http.get(internalApis.users + "/"+ this.user_email).subscribe((usuario: any)=>{
      this.user_name = usuario.name;
      this.user_lastnames = usuario.last_names;
      })
   }

     ngOnInit() {
        if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;
        } else {
          this.auth.getProfile((err, profile) => {
            this.profile = profile;
          });
        }
    }

    enviarFormulario()
    {
      console.log("a");
    }

  }
