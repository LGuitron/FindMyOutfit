import { Component, OnInit } from '@angular/core';
import internalApis from '../../../assets/json/internalApis.json';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Chart} from 'chart.js';
import {Router} from "@angular/router";
import {Sugerencia} from '../../models/sugerencia';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  labels_tags = []; // labels returned from database
  sugerencias = new Array<Sugerencia>();
  mapaSugerencias = new Map(); 

  PieChart = []; // variable for creation of piechart
  datos = []; // data from db
  user_email : string;
  user_type : string; 

  constructor(private http: HttpClient, private router: Router) {

      if(localStorage.getItem("user_email") == null)
        this.router.navigate(['']);


      this.user_email = localStorage.getItem("user_email");
      this.user_type = localStorage.getItem("user_type");
  
        // Block access to non company users
        
  
        

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



  getUsersID(id : string)
  {
       this.http.get(internalApis.users + "/" + id).subscribe((result: any) => {
        let resultados = result;
        this.datos= result;
        if(result['type'] == 'company'){
          document.getElementById("Company").textContent="Tipo de usuario: ";
          document.getElementById("Companydatos").textContent="Empresa";

          this.http.get(internalApis.suggestions).subscribe((catalogo: any)=>{
            for (let sugerencia of catalogo)
            {
              if(sugerencia.user_id == this.user_email)
              {
                this.sugerencias.push(sugerencia);
                var count = 1; 
                for (let tag of sugerencia.tags){
                  if(this.mapaSugerencias.has(tag)){
                    count = this.mapaSugerencias.get(tag);
                    count = count + 1;
                  }
                  this.mapaSugerencias.set(tag,count);

                }
                
              }
            }
            console.log("hola");
            console.log(this.mapaSugerencias);
            this.getLabels2();
          });


        }

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
  if(this.user_type == 'company'){
    console.log("hola dos");
            console.log(this.mapaSugerencias);
    let keys1 = Array.from(this.mapaSugerencias);
    keys1.sort(function(a,b){
      return b[1]- a[1];
    });
    let tenkeys  = keys1.slice(0,10);


    var title = [];
    var values = [];
    for (let key of tenkeys) {
      title.push(key[0]);
      values.push(key[1]);

    }


    this.labelsType = title;
    console.log("labelsType company");
    console.log(this.labelsType);
    this.labelsValues = values;
    console.log("labelsvalues company");
    console.log(this.labelsValues);
    this.generatePieChart(this.labelsType, this.labelsValues);

  }else{

    var tags = new Map();  // map with labels as keys and times they appear as value
    var i;
    for (i = 0; i < this.labels_tags.length; i++) {
      var count = 1
      if(tags.has(this.labels_tags[i])){
        count = tags.get(this.labels_tags[i]);
        count = count + 1;
      }
      tags.set(this.labels_tags[i],count);
    }
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

 getLabels2(){
  if(this.user_type == 'company'){
    console.log("hola dos");
            console.log(this.mapaSugerencias);
    let keys1 = Array.from(this.mapaSugerencias);
    keys1.sort(function(a,b){
      return b[1]- a[1];
    });
    let tenkeys  = keys1.slice(0,10);


    var title = [];
    var values = [];
    for (let key of tenkeys) {
      title.push(key[0]);
      values.push(key[1]);

    }


    this.labelsType = title;
    console.log("labelsType company");
    console.log(this.labelsType);
    this.labelsValues = values;
    console.log("labelsvalues company");
    console.log(this.labelsValues);
    this.generatePieChart(this.labelsType, this.labelsValues);

  }else{

    var tags = new Map();  // map with labels as keys and times they appear as value
    var i;
    for (i = 0; i < this.labels_tags.length; i++) {
      var count = 1
      if(tags.has(this.labels_tags[i])){
        count = tags.get(this.labels_tags[i]);
        count = count + 1;
      }
      tags.set(this.labels_tags[i],count);
    }
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

}
