import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

export interface UriVideoSource {
    uri: string;
}

@injectable()
export abstract class RandomMemoryStoreService {

    source: UriVideoSource = {
        uri: ''
    };

    constructor() {
        makeObservable(this, {
            source: observable,
            getRandomMemory: action
        });
    }

    abstract getRandomMemory(): void
}

@injectable()
export class MemoryStoreServiceFromHttpSource extends RandomMemoryStoreService {

    getRandomMemory(): void {
        this.source.uri = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4';
    }
}
