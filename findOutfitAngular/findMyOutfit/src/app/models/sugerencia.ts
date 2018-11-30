export class Sugerencia {
  name: string;
  store: string;
  cost: number
  url_image: string;
  url_website: string;
  tags: Array<string>

  constructor(name: string, store: string, cost: number, url_image: string, url_website: string, tags : Array<string>){
      this.name = name;
      this.store = store;
      this.cost = cost;
      this.url_image = url_image;
      this.url_website = url_website;
      this.tags = tags;
  }
}
