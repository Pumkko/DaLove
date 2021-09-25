import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

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
