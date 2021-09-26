import { injectable } from 'inversify';
import Auth0 from 'react-native-auth0';
import { AuthConfiguration } from '../../configuration/auth-configuration.conf';
import { AuthStoreService } from '../abstracts/abstract-auth.store.service';


@injectable()
export class Auth0StoreService extends AuthStoreService {

    private readonly auth0 = new Auth0(AuthConfiguration);

    login(): void {
        this.auth0.webAuth.authorize({
            audience: AuthConfiguration.audience,
            scope: 'openid profile email read:memories'
        }).then(credentials => {
            this.setToken(credentials.accessToken);
        });

    }

    logout(): void {
        this.auth0.webAuth.clearSession().then(() => {
            this.setToken('');
        });
    }

}