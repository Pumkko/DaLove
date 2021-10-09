import { inject, injectable } from 'inversify';
import { computed, flow, makeObservable, observable, runInAction } from 'mobx';
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
            getRandomMemory: flow
        });
    }

    get hasValidMemorySource(): boolean {
        return this.memorySource.uri as unknown as boolean;
    }

    async getRandomMemory(): Promise<void> {
        try {
            const source = await this.memoryServiceService.getRandomMemory();
            runInAction(() => {
                this.memorySource = source;
            });

        }catch{
            // TODO: Do something later
            runInAction(() => {
                this.memorySource = {uri: ''};
            });
        }
    }

}