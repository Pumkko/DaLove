import { inject, injectable } from 'inversify';
import { action, computed, flow, makeObservable, observable, runInAction } from 'mobx';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { IRandomMemoryAccessService, UriVideoSource } from '../interfaces/random-memory-access-service.interface';

@injectable()
export class MemoryStoreService {

    memorySource: UriVideoSource = {uri: ''};

    @inject(AppContainerTypes.IRandomMemoryAccessService) private readonly memoryServiceService!: IRandomMemoryAccessService

    constructor() {
        makeObservable<MemoryStoreService>(this, {
            memorySource: observable,
            hasValidMemorySource: computed,
            getRandomMemory: action
        });
    }

    get hasValidMemorySource(): boolean {
        return this.memorySource.uri as unknown as boolean;
    }

    async getRandomMemory(): Promise<void> {
        const source = await this.memoryServiceService.getRandomMemory();
        runInAction(() => {
            this.memorySource = source;
        });
    }

}