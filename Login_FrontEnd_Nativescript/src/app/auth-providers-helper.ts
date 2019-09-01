import {
    configureTnsOAuth,  
} from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsFacebook,
    TnsOaProviderFacebook,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle,

} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const googleProvider = configureOAuthProviderGoogle();
    const facebookProvider = configureOAuthProviderFacebook();
    configureTnsOAuth([googleProvider,facebookProvider]);
}

export function configureOAuthProviderGoogle(): TnsOaProvider {
    const googleProviderOptions: TnsOaProviderOptionsGoogle = {
        openIdSupport: "oid-full",
        clientId:
            "393543094993-i783juagm844qj552bm9nkps7m1vm9jb.apps.googleusercontent.com",
        redirectUri:
            "com.googleusercontent.apps.393543094993-i783juagm844qj552bm9nkps7m1vm9jb:/auth",
        urlScheme:
            "com.googleusercontent.apps.393543094993-i783juagm844qj552bm9nkps7m1vm9jb",
        scopes: ["email","profile","https://www.googleapis.com/auth/user.birthday.read"]
    };
    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}

export function configureOAuthProviderFacebook(): TnsOaProvider {

    const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
        openIdSupport: "oid-none",
        clientId: "456435185197774",
        clientSecret: "c8b95fbcd9a5bfcd2d20cddebbf2eb9c",
        redirectUri: "https://www.facebook.com/connect/login_success.html",
        scopes: ["email"]
    };
    const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;


}

