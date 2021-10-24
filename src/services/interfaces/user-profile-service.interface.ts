import { UserProfile } from '../../data/user-profile';
import { AvatarSource } from '../../views/screens/user-profile-creation.screen';

export interface IUserProfileService {
    storeAvatar(avatar: AvatarSource): Promise<void>;
    createUserProfile(newUserProfile: UserProfile): Promise<UserProfile>;
    getConnectedUserProfile(): Promise<UserProfile | null>;
}