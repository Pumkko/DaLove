import { injectable } from 'inversify';
import { action, computed, makeObservable, observable } from 'mobx';
import Auth0 from 'react-native-auth0';
import { AuthConfiguration } from '../configuration/auth-configuration.conf';

@injectable()
export abstract class AuthStoreService {

    token = '';

    constructor() {
        makeObservable(this, {
            token: observable,
            isLoginSuccessfull: computed,
            login: action,
            logout: action
        });
    }

    get isLoginSuccessfull(): boolean {
        // We just want to know if token is truthy
        return this.token as unknown as boolean;
    }

    abstract login(): void;
    abstract logout(): void;
}


@injectable()
export class FakeAuthStoreService extends AuthStoreService {
    login(): void {
        this.token = 'fake token';
    }
    logout(): void {
        this.token = '';
    }

}

@injectable()
export class Auth0StoreService extends AuthStoreService {

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