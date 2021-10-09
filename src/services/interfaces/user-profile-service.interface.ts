import { UserProfile } from '../../data/user-profile';

export interface IUserProfileService {
    createUserProfile(newUserProfile: UserProfile): Promise<void>;
    getConnectedUserProfile(): Promise<UserProfile>;
}