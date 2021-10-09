import { inject, injectable } from 'inversify';
import { makeObservable, observable, computed, runInAction } from 'mobx';
import { UserProfile } from '../../data/user-profile';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { IAuthService } from '../interfaces/auth-service.interface';
import { IUserProfileService } from '../interfaces/user-profile-service.interface';


@injectable()
export class LoginStoreService {

    private _token = '';

    userProfile: UserProfile = {
        displayName: '',
        uniqueUserName: '',
    };

    @inject(AppContainerTypes.IAuthService) private readonly authService!: IAuthService
    @inject(AppContainerTypes.IUserProfileService) private readonly userProfileService!: IUserProfileService;

    constructor() {
        makeObservable<LoginStoreService>(this, {
            userProfile: observable,
            isLoginSuccessfull: computed
        });
    }

    get isLoginSuccessfull(): boolean {
        return this.userProfile.uniqueUserName as unknown as boolean;
    }

    get token(): string {
        return this._token;
    }

    async login(): Promise<UserProfile> {
        const token = await this.authService.login();
        const userProfile = await this.userProfileService.getConnectedUserProfile();
        runInAction(() => {
            this.userProfile = userProfile;
        });

        return userProfile;
    }    

    async logout(): Promise<void> {
        runInAction(() => {
            this.userProfile = {
                displayName: '',
                uniqueUserName: ''
            };
        });
        await this.authService.logout();
    }

}