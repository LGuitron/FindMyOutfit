import { Component, OnInit } from '@angular/core';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Chart} from 'chart.js';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  labels_tags = []; // labels returned from database

  PieChart = []; // variable for creation of piechart
  datos = []; // data from db
  constructor(private http: HttpClient, private router: Router) {

      if(localStorage.getItem("user_email") == null)
        this.router.navigate(['']);

  } //constructor for httpclient call

  labelsType = new Object(); // labels title
  labelsValues = []; //labels values for each title


  ngOnInit() {
    //this.user_email = localStorage.getItem("user_email");
    this.getUsersID(localStorage.getItem("user_email"))//"legl_1995@hotmail.com");
    console.log("resultado pt 2");
    console.log(this.labels_tags);

    //this.getLabels();
    //this.generatePieChart();
  }

  ngAfterContentInit(){
    //setTimeout(function(){
      console.log("resultado pt 2")
      console.log(this.labels_tags);
    //}, 2000);

  }

  getUsers()
  {
    this.http.get(internalApis.users).subscribe(result => {
                      this.labels_tags = result[''].map(result => result.tag_history);
                  }
                  ,
              () => {
                console.log("Request complete")
              }
                  );
  }

  getUsersID(id : string)
  {
       this.http.get(internalApis.users + "/" + id).subscribe((result: any) => {
        let resultados = result;
        this.datos= result;

        try{
         this.labels_tags = result['tag_history'];//.map(res => res.tag_history);

        console.log("resultado");
        console.log(resultados);
        console.log("tags");
        console.log(this.labels_tags);
        this.getLabels();
        }catch(error ){
          console.log("jiji");
          document.getElementById("noTags").textContent="Aún no tienes búsquedas. ";
        };
      }, error => {
        document.getElementById("noTags").textContent="newtext";
        console.error("ERROR: Unexpected response");

       });
  }


  generatePieChart(history_labels, history_data){
    this.PieChart = new Chart('pieChart',{
      type: 'pie',
      data:{
        labels: history_labels,
        datasets:[{
          label: "Lo que más buscas",
          data: history_data,
          lineTension: 1,
          backgroundColor: [
            'rgba(255, 99, 132,0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(135, 206, 235,0.9)',
            'rgba(255, 69, 0,0.7)',
            'rgba(148, 0, 211,0.7)',
            'rgba(72, 61, 139,0.7)'
          ],
          borderWidth: 1
        }]
      },
      options:{
        title:{
          text:"Tus 10 búsquedas más frecuentes",
          display: true
        },
        cutoutPercentage: 40,
        legend: {position:'bottom',
              labels:{pointStyle:'circle',
              usePointStyle:true}
          },

    maintainAspectRatio: false
      }
    });


  }

 getLabels(){
    var tags = new Map();  // map with labels as keys and times they appear as value
    var i;
    console.log("labels tags");
    console.log(this.labels_tags);
    console.log("labels tags length");
    console.log(this.labels_tags.length);
    for (i = 0; i < this.labels_tags.length; i++) {
      console.log("this.labels_tags[i]");
      console.log(this.labels_tags[i]);
      var count = 1
      if(tags.has(this.labels_tags[i])){
        count = tags.get(this.labels_tags[i]);
        count = count + 1;
      }
      tags.set(this.labels_tags[i],count);
    }
    console.log("tags");
    console.log(tags);
    //mapa a array
    let keys = Array.from(tags);
    keys.sort(function(a,b){
      return b[1]- a[1];
    });
    let tenkeys  = keys.slice(0,10);

    var title = [];
    var values = [];
    for (let key of tenkeys) {
      title.push(key[0]);
      values.push(key[1]);

    }


    this.labelsType = title;
    console.log("labelsType");
    console.log(this.labelsType);
    this.labelsValues = values;
    console.log("labelsvalues");
    console.log(this.labelsValues);
    this.generatePieChart(this.labelsType, this.labelsValues);
 }

}
