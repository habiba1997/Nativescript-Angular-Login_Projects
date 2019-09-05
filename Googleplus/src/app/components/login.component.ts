import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "nativescript-angular";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";
import { request, HttpResponse } from "tns-core-modules/http";
import { AuthService } from "../auth.service";
import { TokenService } from "../token.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./login.component.html",
})
export class LoginComponent {

  constructor(
      private authService : AuthService,
      private routerExtensions: RouterExtensions,
      private token : TokenService){}

  Welcome: string = 'Hello There, Please Login';
  googlePLusSendData(obj)
  {
    console.log(obj);

    this.token.getObject(obj.sub ,"",obj.email,"" ,obj.picture);

  }

  navigateToAuthenticated()
      {
          this.routerExtensions
          .navigate(["./authenticated"])
          .then(() => console.log("navigated to /authenticated"))
          .catch(err => console.log("error navigating to /authenticated: " + err));
      }
  
  onTapLogin()
  {

    this.authService
    .tnsOauthLogin("google")
    .then((result: ITnsOAuthTokenResult) => {
      console.log("back to login component with token " + result.accessToken);
      this.GooglePlusApiRequest(result.accessToken);

    })
    .catch(e => console.log("Error in Login: " + e)); 
   }
   
   
   getCommonHeaders(accessToken: string) {
    return {
       "Authorization": "Bearer " + accessToken
    }
  }
   GooglePlusApiRequest(accessToken: string)
   {
     
       request({
           url: "https://www.googleapis.com/oauth2/v3/userinfo",
           method: "GET",
           headers: this.getCommonHeaders(accessToken)
       }).then((response: HttpResponse) => {
        

           var obj = response.content.toJSON();

           this.googlePLusSendData(obj);

           this.navigateToAuthenticated();


       }, (e) => {
           console.log("Error: "+ e);
       });
   }

}


    

