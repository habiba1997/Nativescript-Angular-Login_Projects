import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "nativescript-angular";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";
import { SocialService } from "../social.service";
import { TokenService } from "../token.service";
import { request, HttpResponse } from "tns-core-modules/http";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./login.component.html",
})
export class ItemsComponent implements OnInit  
{ 

  constructor(
      private token : TokenService,
      private authService: SocialService, 
      private routerExtensions: RouterExtensions){}

  Welcome: string = 'Hello There, Please Login';

  ngOnInit() {
  }

  sendData(obj) {
    this.token.getObject(obj.id,obj.name,obj.email,obj.birthday,obj.picture.data.url);
  } 


    onTapLogin(args) 
    {
     
      this.authService
          .tnsOauthLogin("facebook")
          .then((result: ITnsOAuthTokenResult) => {
        
            this.facebookGraphApiRequest(result.accessToken);
         
          })
          .catch(e => console.log("Error: " + e));
    }

    facebookGraphApiRequest(accessToken: string)
    {
      
        request({
            url: "https://graph.facebook.com/me?fields=id,name,birthday,email,picture.width(150).height(150)&access_token="+accessToken,
            method: "GET"
        }).then((response: HttpResponse) => {
            // The toString, var img = response.content.toImage()   //var data = JSON.stringify(response);

            var obj = response.content.toJSON();
            
            this.sendData(obj);

            this.navigateToAuthenticated();

           console.log(obj);

        }, (e) => {
            console.log("Error: "+ e);
        });
    }

    navigateToAuthenticated()
    {
        this.routerExtensions
        .navigate(["./authenticated"])
        .then(() => console.log("navigated to /authenticated"))
        .catch(err => console.log("error navigating to /authenticated: " + err));
    }

}


    

