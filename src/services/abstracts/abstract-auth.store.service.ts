import { injectable } from 'inversify';
import { makeObservable, observable, computed, action } from 'mobx';

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

