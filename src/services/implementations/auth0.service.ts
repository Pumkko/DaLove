import { injectable } from 'inversify';
import Auth0 from 'react-native-auth0';
import { AuthConfiguration } from '../../configuration/auth-configuration.conf';
import { IAuthService } from '../interfaces/auth-service.interface';



@injectable()
export class Auth0Service implements IAuthService {

    private readonly auth0 = new Auth0(AuthConfiguration);

    private idToken = '';
    private accessToken = '';


    login(): Promise<string> {
        return this.auth0.webAuth.authorize({
            audience: AuthConfiguration.audience,
            scope: 'openid profile email read:memories'
        }).then(credentials => {
            this.accessToken = credentials.accessToken;
            this.idToken = credentials.idToken;
            return this.accessToken;
        });
    }

    logout(): Promise<void> {
        return this.auth0.webAuth.clearSession().then(() => {
            this.accessToken = '';
            this.idToken = '';
        });
    }

}