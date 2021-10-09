import { UserProfile } from '../../data/user-profile';

export interface IUserProfileService {
    getConnectedUserProfile(): Promise<UserProfile>;
}