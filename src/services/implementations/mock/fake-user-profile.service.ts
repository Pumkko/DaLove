import { injectable } from 'inversify';
import { UserProfile } from '../../../data/user-profile';
import { IUserProfileService } from '../../interfaces/user-profile-service.interface';


@injectable()
export class FakeUserProfileService implements IUserProfileService{


    private _currentUserProfile = {
        displayName: '',
        uniqueUserName: ''
    };

    getConnectedUserProfile(): Promise<UserProfile> {
        return Promise.resolve(this._currentUserProfile);
    }


    createUserProfile(newUserProfile: UserProfile): Promise<void> {
        this._currentUserProfile = newUserProfile;
        return Promise.resolve();
    }
    
}