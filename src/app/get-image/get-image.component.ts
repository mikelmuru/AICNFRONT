import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { GetImageService } from './get-image.service';

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
  //    IMAGENOTFOUND: GUARDAMOS AQUI EL TEXTO EN CASO DE NO ENCONTRAR LA IMAGEN PEDIDA
  public nombrefoto: string = ''
  public imagenotfound: string = ''

  //ESTA VARIABLE ALMACENA LA RESPUESTA DE LA PETICION GET
  public fotorecibida: string = ''

  constructor(private service: GetImageService) { }

  ngOnInit(): void {
  }

  cargarNombre(imagename: string, textarea: any) {
    this.limpiarFotorecibida(textarea)

    console.log("Texto de input recibidio. Llamamos al servicio HTTP.")

    this.service.getImage(imagename).subscribe((response) => {
      if (response.resultado.length > 100) {
        this.fotorecibida = this.base64type + response.resultado
        console.log("Imagen recibida correctamente.")
      } else {
        this.imagenotfound = response.resultado
        console.log("Error al recibir la imagen.")
      }
    })
  }

  limpiarFotorecibida(textarea: any) {
    this.fotorecibida = ''
    this.imagenotfound = ''
    textarea.value = ''
    console.log("Variables reseteadas.")
  }

}
