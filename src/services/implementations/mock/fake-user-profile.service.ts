import { injectable } from 'inversify';
import { UserProfile } from '../../../data/user-profile';
import { IUserProfileService } from '../../interfaces/user-profile-service.interface';


@injectable()
export class FakeUserProfileService implements IUserProfileService {
    private _currentUserProfile: UserProfile = {
        displayName: 'display_fake',
        uniqueUserName: 'unique_fake', 
        avatarUri: 'https://placebear.com/640/360'
    };


    getConnectedUserProfile(): Promise<UserProfile | null> {
        return Promise.resolve(this._currentUserProfile);
    }


    createUserProfile(newUserProfile: UserProfile): Promise<UserProfile> {
        this._currentUserProfile = newUserProfile;
        return Promise.resolve(newUserProfile);
    }

    storeAvatar(): Promise<string> {
        return Promise.resolve('https://placebear.com/640/360');
    }

    updateFcmDeviceToken(): Promise<void> {
        return Promise.resolve();
    }

    isUsernameAvailable(newUniqueUserName: string): Promise<boolean> {
        const available = newUniqueUserName === 'empty';
        return Promise.resolve(available);
    }
}