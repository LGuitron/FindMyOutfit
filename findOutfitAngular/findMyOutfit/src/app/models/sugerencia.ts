export class Sugerencia {
  nombre: string;
  tienda: string;
  costo: number;
  url_imagen: string;
  url_sitioweb: string;

  constructor(nombre: string, tienda: string, costo: number, url_imagen: string, url_sitioweb: string){
      this.nombre = nombre;
      this.tienda = tienda;
      this.costo = costo;
      this.url_imagen = url_imagen;
      this.url_sitioweb = url_sitioweb;
  }
}
