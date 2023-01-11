import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class CodBase64Service {

  constructor() {
  }

  readFile(file: any, subscriber: Subscriber<any>) {
    const filereader = new FileReader()
    filereader.readAsDataURL(file)

    filereader.onload = () => {
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror = (error) => {
      subscriber.error(error)
      subscriber.complete()
    }
  }
  
  dataURItoBlob(dataURI:any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }
}