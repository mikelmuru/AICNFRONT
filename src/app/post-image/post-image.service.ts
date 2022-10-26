import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class PostImageService {

  constructor(private http: HttpClient) {
  }
  
  postNewImage(data: FormData): Observable<any> {
    console.log("Aqui hacemos hacemos el POST a nuestro back.")
    return this.http.post("http://localhost:8080/aicn/files/upload", data)
  }
  
}