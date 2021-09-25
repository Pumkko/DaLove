import { injectable } from 'inversify';
import { RandomMemoryStoreService } from '../../abstracts/abstract-random-memory.store.service';

@injectable()
export class MemoryStoreServiceFromHttpSource extends RandomMemoryStoreService {
    getRandomMemory(): void {
        this.setRandomMemorySource('https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4');
    }
}
