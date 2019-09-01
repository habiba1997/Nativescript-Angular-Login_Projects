import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./components/LoginComponent/login.component"
import { PictureComponent } from "./components/UploadPicComponent/picture.component";
import { AuthenticatedComponent } from "./components/AuthenticatedComponent/authenticated.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "authenticated", component: AuthenticatedComponent },
    { path: "uploadPicture", component: PictureComponent },

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [ 
    LoginComponent, 
    AuthenticatedComponent, 
    PictureComponent
    
  ];

