export class Sugerencia {
  nombre: string;
  tienda: string;
  costo: string;
  url_imagen: string;
  url_sitioweb: string;
  tags: Array<string>

  constructor(nombre: string, tienda: string, costo: string, url_imagen: string, url_sitioweb: string, tags : Array<string>){
      this.nombre = nombre;
      this.tienda = tienda;
      this.costo = costo;
      this.url_imagen = url_imagen;
      this.url_sitioweb = url_sitioweb;
      this.tags = tags;
  }
}
