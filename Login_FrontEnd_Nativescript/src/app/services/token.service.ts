import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable(  
)
export class TokenService {

    private dataObjectSource = new BehaviorSubject({id:"",name: "",url:""});

    dataObject = this.dataObjectSource.asObservable();
  

  constructor() { }


  getObject(id,name,profilePicUrl) 
  {
    this.dataObjectSource.next({id:id, name: name, url:profilePicUrl});
  
  }

}
