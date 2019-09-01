import { Injectable } from '@angular/core';
import { request, HttpResponse } from "tns-core-modules/http";
import { TokenService } from "../services/token.service";

@Injectable()


export class FacebookLoginService {

  constructor( 
    private token : TokenService, 
    ) { }


  facebookGraphApiRequest(accessToken: string, IP: string)
  {
      request({
          url: "https://graph.facebook.com/me?fields=id,name,birthday,email,picture.width(150).height(150)&access_token="+accessToken,
          method: "GET"
      }).then((response: HttpResponse) => {
          // The toString, var img = response.content.toImage()   //var data = JSON.stringify(response);

          var obj = response.content.toJSON();
          
          console.log(obj);
          
          request({
            url: "http://"+ IP +":3000/users/login/"+obj.id,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify( {
              "_id": obj.id,
              "name": obj.name,
              "email": obj.email,
              "password": "beebz1997",
              "birthday": obj.birthday,
              "imageUrl": obj.imageUrl,
            })
        }).then((response: HttpResponse) => {
              
          console.log(response);
 
         }, (e) => {
 
                 console.log("Error: "+ e);
         });


         
          this.facebookSendData(obj);

          
          
      }, (e) => {
          console.log("Error: "+ e);
      });

  }

  facebookSendData(obj) {
    this.token.getObject(obj.id,obj.name,obj.picture.data.url);
  } 
}
