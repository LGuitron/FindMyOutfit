import { Component, OnInit } from '@angular/core';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  queryresult : any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.getUsers();
    this.getUsersID("legl_1995@hotmail.com")
  }

  getUsers()
  {
    this.http.get(internalApis.users).subscribe((result: any) => {
                      //console.log(result);
                      this.queryresult = result;
                  });
  }

  getUsersID(id : string)
  {
      this.http.get(internalApis.users + "/" + id).subscribe((result: any) => {
                    //console.log(result);
                    this.queryresult = result;
                });
  }

}
