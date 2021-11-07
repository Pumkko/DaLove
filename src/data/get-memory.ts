import { UserProfile } from './user-profile';

export interface GetMemory {
    memoryUri: string;
    memoryFriendlyName: string;
    creator: UserProfile;
}