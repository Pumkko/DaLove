import { inject, injectable } from 'inversify';
import { makeObservable, observable, computed, runInAction } from 'mobx';
import { UserProfile } from '../../data/user-profile';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { AvatarSource } from '../../views/screens/user-profile-creation.screen';
import { IAuthService } from '../interfaces/auth-service.interface';
import { IUserProfileService } from '../interfaces/user-profile-service.interface';


@injectable()
export class LoginStoreService {

    private _token = '';

    userProfile: UserProfile = {
        displayName: '',
        uniqueUserName: '',
    };

    hasValidAvatar = false;

    @inject(AppContainerTypes.IAuthService) private readonly authService!: IAuthService
    @inject(AppContainerTypes.IUserProfileService) private readonly userProfileService!: IUserProfileService;

    constructor() {
        makeObservable<LoginStoreService>(this, {
            userProfile: observable,
            hasValidAvatar: observable,
            isLoginSuccessfull: computed
        });
    }

    get isLoginSuccessfull(): boolean {
        return this.userProfile.uniqueUserName as unknown as boolean;
    }

    get token(): string {
        return this._token;
    }

    async login(): Promise<UserProfile | null> {
        await this.authService.login();


        const userProfile = await this.userProfileService.getConnectedUserProfile();

        if (!userProfile) {
            return null;
        }

        return runInAction(() => {
            this.userProfile = userProfile;
            if (userProfile.avatarUri) {
                this.hasValidAvatar = true;
            }
            return userProfile;
        });
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

    async createUserProfile(newUserProfile: UserProfile): Promise<void> {
        await this.userProfileService.createUserProfile(newUserProfile);
        runInAction(() => {
            this.userProfile = newUserProfile;
        });

    }

    async storeAvatar(avatar: AvatarSource): Promise<void> {
        const uri = await this.userProfileService.storeAvatar(avatar);
        this.userProfile.avatarUri = uri;
        runInAction(() => {
            this.hasValidAvatar = true;
        });
    }

}