import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { request, HttpResponse } from "tns-core-modules/http";
import { TokenService } from "~/app/services/token.service";
import { AuthService } from "~/app/services/auth.service";
import { NavigationService } from "~/app/services/navigation.service";

@Component({
  selector: "ns-authenticated",
  moduleId: module.id,
  templateUrl: "authenticated.component.html",
  styleUrls: ['../CSS.component.css']

})
export class AuthenticatedComponent implements OnInit {

constructor(private token : TokenService,
  private authService: AuthService, 
  private routerExtensions: RouterExtensions,
  private navigate : NavigationService,
  ) {}

Object: { id:string, name:string, url:string };

ngOnInit()
{
  
  this.token.dataObject.subscribe(object => this.Object = object);
  request({
        url: "http://"+"192.168.1.6"+":3000/users/"+this.Object.id,
        method: "GET"
    }).then((response: HttpResponse) => {
        
        var obj = response.content.toJSON();

        console.log(obj.imageUrl);

        this.Object.url = obj.imageUrl;

    }, (e) => {
        console.log("Error: "+ e);
    });
  }

  onTapNavigateToPicture()
  {
    this.navigate.navigateTo("./uploadPicture")
  }
  
  public onTapLogout() {
    this.authService.tnsOauthLogout();
    this.routerExtensions.back();
  }
}