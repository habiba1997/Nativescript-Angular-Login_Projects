import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule, RoutingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { GooglePlusLoginService } from "./services/googleplusLogin.service";
import { FacebookLoginService } from "./services/facebookLogin.service";

import { NavigationService } from "./services/navigation.service";
import { TokenService } from "./services/token.service";
import { AuthService } from "./services/auth.service";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        CommonModule, 
        FormsModule,
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        RoutingComponents,
    ],
    providers: [
        AuthService,
        TokenService,
        GooglePlusLoginService, 
        FacebookLoginService, 
        NavigationService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
