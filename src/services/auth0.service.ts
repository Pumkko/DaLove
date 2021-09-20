import { injectable } from 'inversify';
import Auth0 from 'react-native-auth0';
import { AuthConfiguration } from '../configuration/auth-configuration.conf';



export interface IAuthService {
    login(): Promise<string>;
    logout(): Promise<void>;
}


@injectable()
export class FakeAuthService implements IAuthService {
    login(): Promise<string> {
        return Promise.resolve('fake token');
    }
    logout(): Promise<void> {
        return Promise.resolve();
    }

}

@injectable()
export class Auth0Service implements IAuthService{

    private readonly auth0 = new Auth0(AuthConfiguration);

    async login(): Promise<string> {
        const credentials = await this.auth0.webAuth.authorize({
            audience: AuthConfiguration.audience,
            scope: 'openid profile email, read:memories'
        });

        return credentials.accessToken;
    }

    async logout(): Promise<void> {
        await this.auth0.webAuth.clearSession();
    }

}