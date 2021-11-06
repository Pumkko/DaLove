import { injectable } from 'inversify';
import { IRandomMemoryAccessService, UriVideoSource } from '../../interfaces/random-memory-access-service.interface';

@injectable()
export class FakeMemoryVideoService implements IRandomMemoryAccessService {

    getRandomMemory(): Promise<UriVideoSource> {

        const fakeUri: UriVideoSource = {
            uri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4'
        };

        return Promise.resolve<UriVideoSource>(fakeUri);
    }

}
