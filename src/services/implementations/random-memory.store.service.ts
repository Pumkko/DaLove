import { injectable } from 'inversify';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { RandomMemoryStoreService } from '../abstracts/abstract-random-memory.store.service';



@injectable()
export class ApiMemoryStoreService extends RandomMemoryStoreService {
    getRandomMemory(): void {
        throw new Error('Method not implemented.');
    }

}

