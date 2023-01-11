import { Component, OnInit } from '@angular/core';
import { EncodedImage } from '../model/encodedimage/encodedimage.component';
import { GetImageService } from '../service/get-image.service';
import { DeleteImageService } from '../service/delete-image.service';

@Component({
  selector: 'get-image',
  templateUrl: './get-image.component.html',
  styleUrls: ['./get-image.component.css']
})
export class GetImageComponent implements OnInit {

  //AQUI GUARDAMOS LA PARTE CONSTANTE DE LA FORMA BASE64 DE LAS IMAGENES
  public base64type: string = 'data:image/jpeg;base64,'

  //ESTAS VARIABLES RECOGEN EL TEXTO INTRODUCIDO EN LA BARRA DE BUSQUEDA DE IMAGENES
  //    NOMBREFOTO: GUARDAMOS AQUI EL TEXTO EN CASO DE ENCONTRAR CON EXITO LA IMAGEN PEDIDA
  public nombrefoto: string = ''

  //EN ESTA VARIABLE GUARDAMOS EL RESULTADO DE NUESTRA BUSQUEDA. LISTA DE IMAGENES
  public miLista: EncodedImage[] = []

  //CONTROL DE MOSTRAS-ESCONDER TARJETA OPCIONES AVANZADAS
  public hide: boolean = false
  public idtarjeta!: number

  constructor(
    private service: GetImageService,
    private deleteservice: DeleteImageService
  ) { }

  ngOnInit(): void {
  }

  cargarNombre(imagename: string, textarea: any) {
    this.limpiarFotorecibida(textarea)
    this.nombrefoto = imagename
    
    console.log("Texto de input recibidio. Llamamos al servicio HTTP.")

    this.searchImages()
  }

  limpiarFotorecibida(textarea: any) {
    this.miLista = []
    textarea.value = ''
    console.log("Variables reseteadas.")
  }

  deleteById(id: number) {
    console.log("Metodo deleteById")
    this.deleteservice.deleteById(id).subscribe((response) => {
      console.log(response)
      this.searchImages()
    })
  }

  editImage(id: number) {
    console.log("Metodo editar imagen")
    this.hide = true
    this.idtarjeta = id
  }

  updateImage() {
    
  }

  searchImages() {
    this.miLista = []
    this.service.getImageFiltered(this.nombrefoto).subscribe((response) => {
      console.log(response)
      response.forEach((imagen: any) => {
        var prueba = new EncodedImage()
        prueba.setImageid(imagen.id)
        prueba.setImagebytes(imagen.encodedFile)
        prueba.setImagename(imagen.imagename)
        prueba.setImageresult(imagen.resultado)
        prueba.setCreatedBy(imagen.createdDate)
        prueba.setCreatedDate(imagen.createdDate)
        prueba.setLastModBy(imagen.lastModBy)
        prueba.setLastModDate(imagen.lastModDate)
        this.miLista.push(prueba)
      })
    })
  }
}
