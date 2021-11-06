import { UserProfile } from '../../data/user-profile';
import { AvatarSource } from '../../views/screens/user-profile-creation.screen';

export interface IUserProfileService {
    storeAvatar(avatar: AvatarSource): Promise<string>;
    createUserProfile(newUserProfile: UserProfile): Promise<UserProfile>;
    getConnectedUserProfile(): Promise<UserProfile | null>;
}