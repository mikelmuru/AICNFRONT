import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class DeleteImageService {

  // ESTE SERVICIO SE ENCARGA DE LAS PETICIONES DELETE

  private baseurldelete: string = 'http://127.0.0.1:8080/aicn/files/delete/'

  constructor(private http: HttpClient) {
  }

  deleteById(id: number): Observable<any> {
    console.log("Aqui hacemos la peticion DELETEBYID.")
    const url = this.baseurldelete + id
    console.log(url)
    return this.http.delete(url)
  }
}