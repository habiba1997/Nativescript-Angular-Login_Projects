import { Injectable } from '@angular/core';
import { RouterExtensions } from "nativescript-angular";

@Injectable(  
)
export class NavigationService {
    
    constructor(    
        private routerExtensions: RouterExtensions,)
        {
            
        }


    navigateTo(path:string)
    {
        this.routerExtensions
        .navigate([path])
        .then(() => console.log("navigated to " + path))
        .catch(err => console.log("error navigating to "+path +" + err"));
    }
  
  

}
