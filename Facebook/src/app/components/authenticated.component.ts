import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { SocialService } from "../social.service";
import { TokenService } from "../token.service";

@Component({
  selector: "ns-authenticated",
  moduleId: module.id,
  templateUrl: "authenticated.component.html"
})
export class AuthenticatedComponent implements OnInit {

constructor(private token : TokenService,
  private authService: SocialService, 
  private routerExtensions: RouterExtensions) {}

Object: { id:string, name:string, email:string, birthday:string, url:string };

ngOnInit()
{
  this.token.dataObject.subscribe(object => this.Object = object);

}
  
  public onTapLogout() {
    this.authService.tnsOauthLogout();
    this.routerExtensions.back();
  }
}