import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import Auth0 from 'react-native-auth0';
import { AuthConfiguration } from '../configuration/auth-configuration.conf';

@injectable()
export abstract class AuthService {

    token = '';

    constructor() {
        makeObservable(this, {
            token: observable,
            login: action,
            logout: action
        });
    }

    abstract login(): void;
    abstract logout(): void;
}


@injectable()
export class FakeAuthService extends AuthService {
    login(): void {
        this.token = 'fake token';
    }
    logout(): void {
        this.token = '';
    }

}

@injectable()
export class Auth0Service extends AuthService {

    private readonly auth0 = new Auth0(AuthConfiguration);

    login(): void {
        this.auth0.webAuth.authorize({
            audience: AuthConfiguration.audience,
            scope: 'openid profile email, read:memories'
        }).then(credentials => {
            this.token = credentials.accessToken;
        });

    }

    logout(): void {
        this.auth0.webAuth.clearSession().then(() => {
            this.token = '';
        });
    }

}