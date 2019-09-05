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
            "",
        redirectUri:
            "",
        urlScheme:
            "",
        scopes: ["email","profile"]
    };
    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}

