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
    errorDuringLogin = false;

    @inject(AppContainerTypes.IAuthService) private readonly authService!: IAuthService
    @inject(AppContainerTypes.IUserProfileService) private readonly userProfileService!: IUserProfileService;

    constructor() {
        makeObservable<LoginStoreService>(this, {
            userProfile: observable,
            errorDuringLogin: observable,
            hasValidAvatar: observable,
            alreadyLogin: computed
        });
    }

    get alreadyLogin(): boolean {
        return this.userProfile.uniqueUserName as unknown as boolean;
    }

    get token(): string {
        return this._token;
    }

    async login(): Promise<UserProfile | null> {

        try {
            await this.authService.login();

            const userProfile = await this.userProfileService.getConnectedUserProfile();

            if (!userProfile) {
                return null;
            }

            await this.userProfileService.updateFcmDeviceToken();

            runInAction(() => {
                if (userProfile.avatarUri) {
                    this.hasValidAvatar = true;
                }
            });

            return runInAction(() => {
                this.userProfile = userProfile;
                return userProfile;
            });
        }
        catch {
            runInAction(() => {
                this.errorDuringLogin = true;
            });
            await this.logout();
            return null;
        }
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

        await this.userProfileService.updateFcmDeviceToken();
    }

    async storeAvatar(avatar: AvatarSource): Promise<void> {
        const uri = await this.userProfileService.storeAvatar(avatar);
        this.userProfile.avatarUri = uri;
        runInAction(() => {
            this.hasValidAvatar = true;
        });
    }

    async isUsernameAvailable(newUniqueUserName: string): Promise<boolean> {
        return await this.userProfileService.isUsernameAvailable(newUniqueUserName);
    }


}