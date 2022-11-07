import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class GetImageService {

  private baseurl: string = 'http://localhost:8080/aicn/files/'

  constructor(private http: HttpClient) {
  }

  getImage(img: string): Observable<any> {
    console.log("Aqui hacemos la peticion GET a nuestro back.")
    const url = this.baseurl + img
    console.log(url)
    return this.http.get(url)
  }
  
}