import { injectable } from 'inversify';
import { makeObservable, observable, action, comparer, computed } from 'mobx';

export interface UriVideoSource {
    uri: string;
}

@injectable()
export abstract class RandomMemoryStoreService {
    source: UriVideoSource = {
        uri: ''
    };

    constructor() {
        makeObservable<RandomMemoryStoreService, 'setRandomMemorySource'>(this, {
            source: observable,
            hasValidSource: computed,
            setRandomMemorySource: action
        });
    }

    get hasValidSource(): boolean {
        return this.source.uri as unknown as boolean;
    }
    
    abstract getRandomMemory(): void
    
    protected setRandomMemorySource(uri: string): void {
        this.source.uri = uri;
    }

}
