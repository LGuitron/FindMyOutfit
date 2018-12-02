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

  tags = new Map();  // map with labels as keys and times they appear as value
  labels_tags = []; // labels returned from database
  PieChart = []; // variable for creation of piechart

  constructor(private http: HttpClient) {
    console.log("constructor");

  } //constructor for httpclient call

  labelsType = []; // labels title
  labelsValues = []; //labels values for each title


  ngOnInit() {
    this.getUsersID("legl_1995@hotmail.com");
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
                  });
  }

  async getUsersID(id : string)
  {
       return await this.http.get(internalApis.users + "/" + id).subscribe((result: any) => {
        this.labels_tags = result;
        console.log("resultado");
        console.log(this.labels_tags);
      });
  }


  generatePieChart(){
    this.PieChart = new Chart('lineChart',{
      type: 'pie',
      data:{
        labels: this.labels_tags,//["Jan","Feb","Mar","Abr","May","Junio","Julio", "Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        datasets:[{
          label: 'Number of items sold in months',
          data: [9,7,3,5,2,10,15,16,19,3,1,9],
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
    var i;
    console.log("labels tags");
    console.log(this.labels_tags);
    for (i = 0; i < this.labels_tags.length; i++) {
      var count = 1
      if(this.tags.has(this.labels_tags[i])){
        count = this.tags.get(this.labels_tags[i]);
        count = count + 1;
      }
      this.tags.set(this.labels_tags[i],count);
    }
    console.log("tags");
    console.log(this.tags);

    this.labelsType = [this.tags.keys()];
    console.log("labelsType");
    console.log(this.labelsType);
    this.labelsValues = [this.tags.values()];
    console.log("labelsvalues");
    console.log(this.labelsValues);
 }


}
