import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-editar-profile',
  templateUrl: './editar-profile.component.html',
  styleUrls: ['./editar-profile.component.scss']
})
export class EditarProfileComponent implements OnInit {

	profile: any;

   constructor(private auth:AuthService) { }

     ngOnInit() {
        if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;
        } else {
          this.auth.getProfile((err, profile) => {
            this.profile = profile;
          });
        }
    }

  }
