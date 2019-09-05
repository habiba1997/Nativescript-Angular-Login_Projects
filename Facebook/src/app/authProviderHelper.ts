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
        clientId: "Enter-Client-ID",
        clientSecret: "Enter-Client-Secret",
        redirectUri: "https://www.facebook.com/connect/login_success.html",
        scopes: ["email"]
    };
    const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;


}


