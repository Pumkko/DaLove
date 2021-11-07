import { injectable } from 'inversify';
import { GetMemory } from '../../../data/get-memory';
import { UserProfile } from '../../../data/user-profile';
import { IRandomMemoryAccessService } from '../../interfaces/random-memory-access-service.interface';

@injectable()
export class FakeMemoryVideoService implements IRandomMemoryAccessService {

    getPossibleRecipientList(filter: string): Promise<UserProfile[]> {
        const profiles: UserProfile[] = [
            {
                displayName: 'Calot',
                uniqueUserName: 'Jean rené',
                avatarUri: 'https://placebear.com/640/360'
            },
            {
                displayName: 'Moïse',
                uniqueUserName: 'confidentiel'
            },
            {
                displayName: 'Moulinier',
                uniqueUserName: 'Afrique'
            }
        ];

        return Promise.resolve(profiles);
    }

    getRandomMemory(): Promise<GetMemory> {

        const fakeMemory: GetMemory = {
            memoryUri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4',
            creator: {
                displayName: 'Fake',
                uniqueUserName: 'uniqueFake',
                avatarUri: 'https://placebear.com/640/360'
            },
            memoryFriendlyName: 'Fake memory'
        };

        return Promise.resolve<GetMemory>(fakeMemory);
    }

    pushNewMemory(): Promise<void> {
        return Promise.resolve();
    }

}
