import { GetMemory } from '../../data/get-memory';
import { UserProfile } from '../../data/user-profile';
import { MemoryVideoUpload } from '../stores/upload-memory.store.service';

export interface UriVideoSource {
    uri: string;
}

export interface IRandomMemoryAccessService {
    getRandomMemory(): Promise<GetMemory | null>
    getPossibleRecipientList(filter: string): Promise<UserProfile[]>
    pushNewMemory(memoryToSend: MemoryVideoUpload, recipientsUniqueUserName: string[], caption?: string): Promise<void>;
}

