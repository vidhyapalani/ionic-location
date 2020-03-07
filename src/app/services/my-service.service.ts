import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor() { }

  register(data){
    let response = new Observable(observer => {
      observer.next(data)
    })
    console.log("msg", data)
    return response;
    
  }
}
