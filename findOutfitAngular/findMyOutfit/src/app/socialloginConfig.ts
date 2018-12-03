import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from "angular-6-social-login";

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("365829297497926")
        },
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("83302281590-50mhubpl387ub6sgehjsohp2om0pngdu.apps.googleusercontent.com")
        },
        {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("86inyrdanaaura")
        }
    ]);
    //Google secret:      shdDI-ggYPLkQPcezlP1-cuP
    // Facebook secret:   eaf87f9ee2caf68d75774d4d52c0f164
    return config;
}
