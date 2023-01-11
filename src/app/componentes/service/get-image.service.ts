import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class GetImageService {

  // ELIMINIAR HASTA EL PUERTO EN LAS URLS -> ESTA PARTE YA ESTA DEFINIDA EN EL TARGET DEL ARCHIVO PROXY.CONF.JSON
  // => LO MISMO EN POSTSERVICE
  // CREAR DE NUEVO LA IMAGEN
  private baseurlsearch: string = 'http://127.0.0.1:8080/aicn/files/searchImages/'
  private baseurltryiamges: string = 'http://127.0.0.1:8080/aicn/files/loadAll'
  private urlprueba: string = 'http://127.0.0.1:8080/aicn/helloworld/pruebaLista'

  constructor(private http: HttpClient) {
  }

  getImageFiltered(filter?: string): Observable<any> {
    console.log("Aqui hacemos la peticion GET a nuestro back.")
    console.log("peticion a 127.0.0.1")
    const url = this.baseurlsearch + filter
    console.log(url)
    return this.http.get(url)
  }

  //ESTE METODO ES PARA RECOGER LAS IMAGENES DE PRUEBA
  getAllImages(): Observable<any> {
    console.log("Aqui hacemos la peticion GETALL a nuestro back.")
    console.log("peticion a 127.0.0.1")
    const url = this.baseurltryiamges
    console.log(url)
    return this.http.get(url)
  }
  
  pruebaRecibirLista(): Observable<any> {
    const url = this.urlprueba
    console.log(url)
    return this.http.get(url)
  }

}