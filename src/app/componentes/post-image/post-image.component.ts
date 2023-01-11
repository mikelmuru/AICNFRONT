import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CodBase64Service } from '../service/codBase64.service';
import { PostImageService } from '../service/post-image.service';
import { ViewChild } from '@angular/core';
import { EncodedImage } from '../model/encodedimage/encodedimage.component';

@Component({
  selector: 'post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PostImageComponent implements OnInit {

  //ESTO SERA LA IMAGEN EN BASE64
  public base64type: string = 'data:image/jpeg;base64,'

  //ARRAY PARA LA RECOGIDA DE MULTIPLES IMAGENES || ARRAY DE FILES ============(DEMO)============
  public archivosMultiples: Array<any> = []

  //VARIABLE PARA ALMACENAR LA LISTA DE IMAGENES PUBLICADAS
  public images: EncodedImage[] = []
  public recibido: number = 0

  //VARIABLE DE CONTROL PARA HABILITAR Y DESHABILITAR BOTONES Y PROGRESSBAR
  public cargando: boolean = false

  @ViewChild('myfile')
  myInput!: ElementRef

  constructor(private service: PostImageService, private base64service: CodBase64Service) { }

  ngOnInit(): void {
  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement

    this.archivosMultiples = [null];
    this.images = []
    this.recibido = 0

    fileUpload.click()
  }

  capturarFile(event: any) {
    var i: number

    //============EN ESTA VERSION INTENTAMOS CAPTURAR VARIOS ARCHIVOS DE IMG==================    DEMO
    this.archivosMultiples = event.target.files
    for (i = 0;i<this.archivosMultiples.length;i++) {
      console.log("Procesando imagen "+ i +"...")
      console.log("Tipo: " + this.archivosMultiples[i].type)
      this.convertToBase64(this.archivosMultiples[i])
    }
    this.recibido = 1

  }

  convertToBase64(file: any) {
    var image: EncodedImage = new EncodedImage()
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.base64service.readFile(file, subscriber)
    })
    observable.subscribe((data) => {
      image.setImagebytes(data)
      image.setImagename(file.name)
      this.images.push(image)
      console.log(image)
    })
    console.log("Imagen convertida a base64.")
  }

  uploadImage() {
    //===================CAMBIAMOS EL VALOR DE cargando A TRUE====================
    this.cargando = true
    this.recibido = 0

    //=======DECLARAMOS UNA VARIABLE QUE RECOGERA LOS ARCHIVOS PARA GENERAR UN FORMDATA
    const formdata = new FormData()

    //=======SECCION PARA SUBIR UNA UNICA IMAGEN=======
    for (var i = 0; i<this.archivosMultiples.length;i++) {
      formdata.append('files',this.archivosMultiples[i])
    }
    this.archivosMultiples = []
    this.images = []

    console.log("FormData con las imagenes creado. A continuacion llamamos al servicio HTTP.")

    this.service.postNewImage(formdata).subscribe((info) => { //TODO EL CODIGO DENTRO DE SUBSCRIBE PORQUE HACE EL ASYNC AWAIT AUTOMATICAMENTE
      info.forEach((imagen: any) => {
        var prueba = new EncodedImage()
        prueba.setImagebytes(imagen.encodedFile)
        prueba.setImagename(imagen.imagename)
        prueba.setImageresult(imagen.resultado)
        this.images.push(prueba)
        console.log(prueba)
      })
      this.recibido = 2
      console.log("forEach terminado.")
    
      this.cargando = false
      console.log("Cargadno a false de nuevo")
    })
    
  }

  // EDITAMOS archivosMultiples y archivosPreview
  removeImage(indexToClear:number) {
    var indexAux:number = 0
    var indexGlobal:number = 0

    var archMultAux:Array<any> = this.archivosMultiples
    var archPrevAux:Array<EncodedImage> = this.images
    this.archivosMultiples = []
    this.images = []

    for (indexAux=0;indexAux<archMultAux.length;indexAux++) {
      if (indexAux != indexToClear) {
        this.archivosMultiples[indexGlobal] = archMultAux[indexAux]
        this.images[indexGlobal] = archPrevAux[indexAux]
      } else {
        if (indexAux+1 != archMultAux.length) {
          this.archivosMultiples[indexGlobal] = archMultAux[indexAux+1]
          this.images[indexGlobal] = archPrevAux[indexAux+1]
          indexAux++
        }
      }
      indexGlobal++
    }
  }
}

