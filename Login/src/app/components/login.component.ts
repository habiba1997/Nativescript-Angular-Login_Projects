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
  
  facebookSendData(obj) {
    this.token.getObject(obj.id,obj.name,obj.email,obj.birthday,obj.picture.data.url);
  } 
  googlepLusSendData(obj)
  {
    this.token.getObject(obj.sub ,obj.name,obj.email,"" ,obj.picture);
  }

  navigateToAuthenticated()
      {
          this.routerExtensions
          .navigate(["./authenticated"])
          .then(() => console.log("navigated to /authenticated"))
          .catch(err => console.log("error navigating to /authenticated: " + err));
      }
  

    onTapLoginFacebook(args) 
    {
       
        this.authService
            .tnsOauthLogin("facebook")
            .then((result: ITnsOAuthTokenResult) => {
          
              this.facebookGraphApiRequest(result.accessToken);
           
            })
            .catch(e => console.log("Error: " + e));
    }
  
  onTapLoginGooglePlus()
  {

    this.authService
    .tnsOauthLogin("google")
    .then((result: ITnsOAuthTokenResult) => {
      console.log("back to login component with token " + result.accessToken);
      console.log("back to login component with token " + result.idToken);

      this.GooglePlusApiRequest(result.accessToken);

    })
    .catch(e => console.log("Error in Login: " + e)); 
   }
   
   facebookGraphApiRequest(accessToken: string)
   {
     
       request({
           url: "https://graph.facebook.com/me?fields=id,name,birthday,email,picture.width(150).height(150)&access_token="+accessToken,
           method: "GET"
       }).then((response: HttpResponse) => {
           // The toString, var img = response.content.toImage()   //var data = JSON.stringify(response);

           var obj = response.content.toJSON();
           
           this.facebookSendData(obj);

           this.navigateToAuthenticated();

          console.log(obj);

       }, (e) => {
           console.log("Error: "+ e);
       });
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
console.log(obj)
           this.googlepLusSendData(obj);

           this.navigateToAuthenticated();


       }, (e) => {
           console.log("Error: "+ e);
       });
   }

}


    








 


    

