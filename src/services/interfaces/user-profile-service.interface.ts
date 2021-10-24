import { UserProfile } from '../../data/user-profile';

export interface IUserProfileService {
    createUserProfile(newUserProfile: UserProfile): Promise<UserProfile>;
    getConnectedUserProfile(): Promise<UserProfile | null>;
}