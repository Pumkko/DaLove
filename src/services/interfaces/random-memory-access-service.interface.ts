import { UserProfile } from '../../data/user-profile';

export interface UriVideoSource {
    uri: string;
}

export interface IRandomMemoryAccessService {
    getRandomMemory(): Promise<UriVideoSource>
    getPossibleRecipientList(filter: string): Promise<UserProfile[]>
    
}

