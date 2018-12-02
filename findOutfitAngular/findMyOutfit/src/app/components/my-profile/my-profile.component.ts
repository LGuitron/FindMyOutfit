import { Component, OnInit } from '@angular/core';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  labels_tags = []; // labels returned from database
  PieChart = []; // variable for creation of piechart

  constructor(private http: HttpClient) {
    console.log("constructor");

  } //constructor for httpclient call

  labelsType = new Object(); // labels title
  labelsValues = []; //labels values for each title


  ngOnInit() {
    this.getUsersID("contacto@hola.com");//("legl_1995@hotmail.com");
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
       this.http.get(internalApis.users + "/" + id).subscribe(result => {
        let resultados = result;
        try{
         this.labels_tags = result['tag_history'];//.map(res => res.tag_history);

        console.log("resultado");
        console.log(resultados);
        console.log("tags");
        console.log(this.labels_tags);
        this.getLabels();
        }catch(error ){
          console.log("jiji");
          document.getElementById("noTags").textContent="Aún no tienes búsquedas";
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
        labels: history_labels ,//this.labels_tags,//["Jan","Feb","Mar","Abr","May","Junio","Julio", "Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        datasets:[{
          label: 'Lo que más buscas',
          data: history_data,//[9,7,3,5,2,10,15,16,19,3,1,9],
          fill: false,
          lineTension:0.2,
          borderColor:"red",
          borderWidth: 1
        }]
      },
      options:{
        title:{
          text:"Pie Chart",
          display: true
        },
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
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

    var title = [];
    for (let key of Array.from(tags.keys())) {
      title.push(key);
    }

    var values = [];
    for (let value of Array.from(tags.values())) {
      values.push(value);
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
