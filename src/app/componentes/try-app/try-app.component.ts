import { Component, OnInit } from '@angular/core';
import { GetImageService } from '../service/get-image.service';
import { PostImageService } from '../service/post-image.service';
import { CodBase64Service } from '../service/codBase64.service';
import { EncodedImage } from '../model/encodedimage/encodedimage.component'

@Component({
  selector: 'app-try-app',
  templateUrl: './try-app.component.html',
  styleUrls: ['./try-app.component.css']
})
export class TryAppComponent implements OnInit {

  //=================CONSTANTES DEL COMPONENTE=======================
  public base64type: string = 'data:image/jpeg;base64,'

  // ================VARIABLES DONDE RECOGEMOS LOS DATOS DE LAS IMAGEN A EVALUAR==============
  public imagenBase64:string = ''
  public imageFile!:File
  public imageBlob!: Blob;

  //=================CONTROL DE CARGA DE IMAGENES===================
  public cargando:boolean = false

  //=================UPDATE CON CLASE ENCODEDIMAGE================
  public imageList: EncodedImage[] = []
  public imagenresultado: EncodedImage = new EncodedImage()

  constructor(
      private serviceGet: GetImageService,
      private servicePost: PostImageService,
      private decoding: CodBase64Service
    ) 
    { }

  ngOnInit(): void {
    this.serviceGet.getAllImages().subscribe((info) => {
      console.log("Creamos la lista de imagenes de prueba.")
      info.forEach((imagen: any) => {
        var prueba = new EncodedImage()
        prueba.setImagebytes(imagen.encodedFile)
        prueba.setImagename(imagen.imagename)
        prueba.setImageresult(imagen.resultado)
        this.imageList.push(prueba)
        console.log(prueba)
      })
    })
  }

  evaluarImagen(imagen: EncodedImage) {
    this.cargando = true

    this.imageBlob = this.decoding.dataURItoBlob(imagen.imagebytes)
    this.imageFile = new File([this.imageBlob], imagen.imagename, { type: 'image/jpeg' })

    var formData = new FormData()
    formData.append("files", this.imageFile)

    this.servicePost.postTryApp(formData).subscribe((info) => {
      info.forEach((image: any) => {
        this.imagenresultado.setImagebytes(image.encodedFile)
        this.imagenresultado.setImagename(image.imagename)
        this.imagenresultado.setImageresult(image.resultado)
        console.log(this.imagenresultado)
      });
      this.cargando = false
    })
  }
}
