import {
    configureTnsOAuth,
} from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsFacebook,
    TnsOaProviderFacebook,
} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const facebookProvider = configureOAuthProviderFacebook();
    configureTnsOAuth([facebookProvider]);

}

export function configureOAuthProviderFacebook(): TnsOaProvider {

    const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
        openIdSupport: "oid-none",
        clientId: "483986182387504",
        clientSecret: "faaebf33c6c323d94eeada725611506d",
        redirectUri: "https://www.facebook.com/connect/login_success.html",
        scopes: ["email"]
    };
    const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;
    

}

