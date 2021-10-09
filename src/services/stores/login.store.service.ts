import { inject, injectable } from 'inversify';
import { makeObservable, observable, computed, runInAction } from 'mobx';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { IAuthService } from '../interfaces/auth-service.interface';


@injectable()
export class LoginStoreService {

    private _token = '';

    @inject(AppContainerTypes.IAuthService) private readonly authService!: IAuthService

    constructor() {
        makeObservable<LoginStoreService, '_token'>(this, {
            _token: observable,
            token: computed,
            isLoginSuccessfull: computed
        });
    }

    get isLoginSuccessfull(): boolean {
        return this._token as unknown as boolean;
    }

    get token(): string {
        return this._token;
    }

    async login(): Promise<void> {
        try {
            const token = await this.authService.login();
            runInAction(() => {
                this._token = token;
            });
        }
        catch (error) {
            // Do something with the error but i'm not doing that yet
            this._token = '';
        }
    }

    async logout(): Promise<void> {
        runInAction(() => {
            this._token = '';
        });
        await this.authService.logout();
    }

}