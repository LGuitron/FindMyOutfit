import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class FacegoogleService {

  constructor(
  	public afAuth: AngularFireAuth
  ) { }

  logout(){
  	return this.afAuth.auth.signOut();
  }

  getAuth(){
  	
  }
}
