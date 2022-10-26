import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CodBase64Service } from '../service/codBase64.service';
import { PostImageService } from './post-image.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css']
})

export class PostImageComponent implements OnInit {

  //ESTO SERA LA IMAGEN EN BASE64
  public base64type: string = 'data:image/jpeg;base64,'

  //ARRAY PARA LA RECOGIDA DE MULTIPLES IMAGENES || ARRAY DE FILES ============(DEMO)============
  public archivosMultiples: Array<any> = []
  public archivosPreview: Array<string> = []

  //CREAMOS 2 ARRAYS: UNO CONTIENE LOS BYTES DE LAS IMAGENES Y EL OTRO SU RESULTADO
  public bytesRecibidos: Array<string> = []
  public resultadoRecibido: Array<string> = []

  @ViewChild('myfile')
  myInput!: ElementRef

  constructor(private service: PostImageService, private base64service: CodBase64Service) { }

  ngOnInit(): void {
  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement

    this.bytesRecibidos = []
    this.resultadoRecibido = []
    this.archivosPreview = [];
    this.archivosMultiples = [null];

    fileUpload.click()
  }

  capturarFile(event: any) {
    var i: number

    //============EN ESTA VERSION INTENTAMOS CAPTURAR VARIOS ARCHIVOS DE IMG==================    DEMO
    this.archivosMultiples = event.target.files
    for (i = 0;i<this.archivosMultiples.length;i++) {
      console.log("Procesando imagen "+ i +"...")
      this.convertToBase64(this.archivosMultiples[i])
    }

    //============LAS 2 LINEAS DE ABAJO CAPTURAN UN UNICO ARCHIVO DE IMAGEN==================
    /*
    this.archivoCapturado = event.target.files[0]
    this.convertToBase64(this.archivoCapturado)
    */

  }

  convertToBase64(file: any) {
      const observable = new Observable((subscriber: Subscriber<any>) => {
        this.base64service.readFile(file, subscriber)
      })
      observable.subscribe((data) => {
        //this.previsual = data
        this.archivosPreview.push(data)
      })
      console.log("Imagen convertida a base64.")
  }

  uploadImage() {
    //=======DECLARAMOS UNA VARIABLE QUE RECOGERA LOS ARCHIVOS PARA GENERAR UN FORMDATA
    const formdata = new FormData()

    //=======SECCION PARA SUBIR UNA UNICA IMAGEN=======
    /*
    formdata.append('files',this.archivoCapturado)
    this.service.generateFormData(formdata)
    */

    //=======SECCION PARA SUBIR UNA UNICA IMAGEN=======
    for (var i = 0; i<this.archivosMultiples.length;i++) {
      formdata.append('files',this.archivosMultiples[i])
    }
    console.log("FormData con las imagenes creado. A continuacion llamamos al servicio HTTP.")
    this.service.postNewImage(formdata).subscribe((info) => {
      info.forEach((element: any) => {
        this.resultadoRecibido.push(element.resultado)
        this.bytesRecibidos.push(this.base64type + element.encodedFile)
        console.log(this.bytesRecibidos)
        console.log(this.resultadoRecibido)
      });
    })
    this.archivosPreview = []
    this.archivosMultiples = []
  }
}
