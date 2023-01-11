import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class PostImageService {

  public urlbase:string = "http://127.0.0.1:8080/aicn/files/upload"
  public urlbasetrymode:string = "http://127.0.0.1:8080/aicn/files/tryapp"

  constructor(private http: HttpClient) {
  }
  
  postNewImage(data: FormData): Observable<any> {
    console.log("Aqui hacemos hacemos el POST a nuestro back.")
    console.log("peticion a 127.0.0.1")
    console.log(this.urlbase)
    return this.http.post(this.urlbase, data)
  }

  postTryApp(data: FormData): Observable<any> {
    console.log("Aqui hacemos hacemos el POST a nuestro back.")
    console.log("peticion a 127.0.0.1")
    console.log(this.urlbase)
    return this.http.post(this.urlbasetrymode, data)
  }
  
}