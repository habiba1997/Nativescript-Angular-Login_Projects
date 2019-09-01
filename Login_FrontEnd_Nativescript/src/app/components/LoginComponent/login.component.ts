import { Component,  OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";
import { GooglePlusLoginService } from "~/app/services/googleplusLogin.service";
import { FacebookLoginService } from "~/app/services/facebookLogin.service";
import { NavigationService } from "~/app/services/navigation.service";
import { TokenService } from "~/app/services/token.service";
import { request, HttpResponse } from "tns-core-modules/http";



@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['../CSS.component.css']
    
})
export class LoginComponent {

  constructor(
      private authService : AuthService,
      private googleplus : GooglePlusLoginService,
      private facebook : FacebookLoginService,
      private navigate : NavigationService,
      private token: TokenService,
     ){}

     
  tokenString: any;
  IP: string ="192.168.1.6";

  login: string = "Hey There, LogIn";
  signup: string ="Be A Part Of Our Community";
  


  public isWrongLogin: boolean = false;

  @ViewChild("email",{static: false}) email: ElementRef;
  @ViewChild("password",{static: false}) password: ElementRef;
  @ViewChild("emailsignup",{static: false}) emailsignup: ElementRef;
  @ViewChild("birthday",{static: false}) birthday: ElementRef;
  @ViewChild("passwordsignup",{static: false}) passwordsignup: ElementRef;
  @ViewChild("firstname",{static: false}) firstname: ElementRef;
  @ViewChild("lastname",{static: false}) lastname: ElementRef;
  
  cleartT()
  {
    this.email.nativeElement.text ="";
    this.password.nativeElement.text ="";
    this.emailsignup.nativeElement.text ="";
    this.birthday.nativeElement.text ="";
    this.firstname.nativeElement.text ="";
    this.lastname.nativeElement.text ="";
    this.passwordsignup.nativeElement.text ="";
  
  }

  printInputs(args?:any)
  {
      console.log( 
        {
          "name": (this.firstname.nativeElement.text+" "+this.lastname.nativeElement.text).toLowerCase( ),
          "email": this.emailsignup.nativeElement.text.toLowerCase( ),
          "password": this.passwordsignup.nativeElement.text.toLowerCase( ),
          "birthday": this.birthday.nativeElement.text.toLowerCase( ),
          "imageUrl": "",
          "emailLogin" : this.email.nativeElement.text.toLowerCase( ),
          "passwordLogin": this.password.nativeElement.text.toLowerCase( ),
        }

      );

  }


    SignUp(){

        request({
          url: "http://"+ this.IP +":3000/users",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify(this.dataSignUp())
          }).then((response: HttpResponse) => {
                console.log(response);
                this.sendEmail();
          }, (e) => {

                  console.log("Error: "+ e);
          });

    }

    sendEmail()
    {
           
                request({
                  url: "http://"+ this.IP +":3000/sendEmail/"+this.emailsignup.nativeElement.text.toLowerCase( ),
                  method: "POST",
                  }).then(() => {
                        console.log("Done");
        
                  }, (e) => {
                      console.log("Error: "+ e);
                  });

            
    }


    dataSignUp()
    {
      this.printInputs();

      return  {
        "name": this.firstname.nativeElement.text.toLowerCase( )+" "+this.lastname.nativeElement.text.toLowerCase( ),
        "email": this.emailsignup.nativeElement.text.toLowerCase( ),
        "password": this.passwordsignup.nativeElement.text.toLowerCase( ),
        "birthday": this.birthday.nativeElement.text.toLowerCase( ),
        "imageUrl": ""
      };
    }
    


    dataLoginExperience(email, password)
    {
      return {
        "email": "beba@hotmail.com",
        "password": "beebz1997"
      };

    }

    dataLogin()
    {
      return {
        "email": this.email.nativeElement.text.toLowerCase( ),
        "password": this.password.nativeElement.text.toLowerCase( )
      };

    }

    getCommonHeaders(accessToken: string) {

      console.log(accessToken);
      return {
         "Authorization": "Bearer " + accessToken
      }
    }
     
    tokenRequest(Url: string, accessToken: string): any{
      request({
             url: Url,
             method: "GET",
             headers: this.getCommonHeaders(accessToken)
         }).then(async (response: any) => {
          
             const dataUser = response.content.toJSON();
             console.log(dataUser.id,dataUser.name);

             this.token.getObject(dataUser.id,dataUser.name,'');

             this.navigate.navigateTo("./authenticated");
  
         }, (e) => {
             console.log("Error: "+ e);
         });
   }

    onTapLogin()
    {
      
         request({
           url: "http://"+ this.IP +":3000/users/login",
           method: "POST",
           headers: { "Content-Type": "application/json" },
           content: JSON.stringify( this.dataLogin())
       }).then((response: HttpResponse) => {
         if(response.content.toJSON().error)
         {
            console.log(response);
            this.isWrongLogin= true;
         } 
         else
         {
          console.log("success: "+ response) 
          this.tokenRequest("http://"+this.IP+":3000/users/me", response.content.toJSON().token);

        } 
      

        }, (e) => {

                console.log("Error: "+ e);
        });
    }
  
    onTapLoginFacebook(args) 
    {
       
        this.authService
            .tnsOauthLogin("facebook")
            .then((result: ITnsOAuthTokenResult) => {
          
              this.facebook.facebookGraphApiRequest(result.accessToken, this.IP );
               
               this.navigate.navigateTo("./authenticated");

           
            })
            .catch(e => console.log("Error: " + e));
    }
  
  onTapLoginGooglePlus()
  {

    this.authService
    .tnsOauthLogin("google")
    .then( (result: ITnsOAuthTokenResult) => {
      console.log("back to login component with token " + result.accessToken);
      console.log("back to login component with token " + result.idToken);

       this.googleplus.GooglePlusApiRequest(result.accessToken, this.IP);
      
      this.navigate.navigateTo("./authenticated");


    })
    .catch(e => console.log("Error in Login: " + e)); 
   }
   
   
   
  

}
