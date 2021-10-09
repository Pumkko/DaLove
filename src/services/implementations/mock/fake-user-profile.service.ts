import { injectable } from 'inversify';
import { UserProfile } from '../../../data/user-profile';
import { IUserProfileService } from '../../interfaces/user-profile-service.interface';


@injectable()
export class FakeUserProfileService implements IUserProfileService{
    getConnectedUserProfile(): Promise<UserProfile> {
        return Promise.resolve({
            displayName: '',
            uniqueUserName: ''
        });
    }
    
}