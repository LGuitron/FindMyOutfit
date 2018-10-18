import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageTransferService {


  constructor() { }
  private imageUrl: string;

  setUrl (data) {
    this.imageUrl = data;
  }

  getUrl () {
    return this.imageUrl;
  }

}
