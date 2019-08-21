import {

    configureTnsOAuth,
    
} from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsFacebook,
    TnsOaProviderFacebook,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle,
    TnsOaProviderOptionsMicrosoft,
    TnsOaProviderMicrosoft
} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const googleProvider = configureOAuthProviderGoogle();

    configureTnsOAuth([googleProvider]);
}

export function configureOAuthProviderGoogle(): TnsOaProvider {
    const googleProviderOptions: TnsOaProviderOptionsGoogle = {
        openIdSupport: "oid-full",
        clientId:
            "393543094993-r6vuogvg0gv5i5p961ijgjnc9blddsm4.apps.googleusercontent.com",
        redirectUri:
            "com.googleusercontent.apps.393543094993-r6vuogvg0gv5i5p961ijgjnc9blddsm4:/auth",
        urlScheme:
            "com.googleusercontent.apps.393543094993-r6vuogvg0gv5i5p961ijgjnc9blddsm4",
        scopes: ["email"]
    };
    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}

