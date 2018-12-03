import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import { ImageTransferService } from '../../services/image-transfer.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {trigger, state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-busca-outfit',
  templateUrl: './busca-outfit.component.html',
  styleUrls: ['./busca-outfit.component.scss'],
  animations: [
    trigger('popOverState',[
      state('show',style({
        opacity: 1
    })),
    state('hide',style({
      opacity: 0
    })),
    transition('show => hide',animate('600ms ease-out')),
    transition('hide => show',animate('1000ms ease-in'))
  ])
  ]
})
export class BuscaOutfitComponent implements OnInit {



  @Output() formReady = new EventEmitter<FormGroup>()
  imageForm = new FormGroup({url : new FormControl()});

   //animations 
   show = false; 
   get stateName(){
     if(!this.show){
      document.getElementById("botonAnim").textContent="Ayuda";
     }else{
      document.getElementById("botonAnim").textContent="OK";
     }
     return this.show ? 'show' : 'hide'
   }
 
   toggle(){
     this.show = !this.show; 
    

   }
 

  constructor(private formBuilder : FormBuilder, public transferService: ImageTransferService, private router: Router)
  {
      this.createForm();
  }

  ngOnInit() {
  }

  createForm()
  {
    this.imageForm = this.formBuilder.group(
    {
      img_url: new FormControl('https://scstylecaster.files.wordpress.com/2014/10/skirt.png')
    }
    );
  }

  // Function for saving values introduced by the user in the form and to send to list of suggestions
  sendForm()
  {
      this.transferService.setUrl(this.imageForm.value.img_url);
      this.router.navigate(['lista-sugerencias']);
  }


}


