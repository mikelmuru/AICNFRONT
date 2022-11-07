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
  
}