import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable(  
)
export class TokenService {

    private dataObjectSource = new BehaviorSubject({id:"",name: "",email:"",birthday:"", url:""});

    dataObject = this.dataObjectSource.asObservable();
  

  constructor() { }


  getObject(id,name,email,birthday,profilePicUrl) 
  {
    this.dataObjectSource.next({id:id,name: name,email:email,birthday:birthday, url:profilePicUrl });
  
  }

}

