import { Injectable } from '@angular/core';
import { request, HttpResponse } from "tns-core-modules/http";
import { TokenService } from "../services/token.service";

@Injectable(  
)
export class GooglePlusLoginService {


    constructor( 
        private token : TokenService,
        )
        {}

    googlepLusSendData(obj)
    {
      this.token.getObject(obj.sub,obj.name,obj.picture);
    }
  
     
     getCommonHeaders(accessToken: string) {
      return {
         "Authorization": "Bearer " + accessToken
      }
    }
  
    
     GooglePlusApiRequest(accessToken: string, IP: string)
     {
       
         request({
             url: "https://www.googleapis.com/oauth2/v3/userinfo",
             method: "GET",
             headers: this.getCommonHeaders(accessToken)
         }).then((response: HttpResponse) => {
          
  
             var obj = response.content.toJSON();
             console.log(obj);


             request({
                url: "http://"+ IP +":3000/users/login/"+obj.sub,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify( {
                  "_id": obj.sub,
                  "name": obj.name,
                  "email": obj.email,
                  "password": "beebz1997",
                  "imageUrl": obj.picture,
                })
            }).then((response: HttpResponse) => {
                  
              console.log(response);
     
             }, (e) => {
     
                     console.log("Error: "+ e);
             });
    

            this.googlepLusSendData(obj);
  
            return obj;
  
         }, (e) => {
             console.log("Error: "+ e);
         });
     }

}
