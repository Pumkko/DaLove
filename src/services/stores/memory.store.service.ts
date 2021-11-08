import { inject, injectable } from 'inversify';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { GetMemory } from '../../data/get-memory';
import { UserProfile } from '../../data/user-profile';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { IRandomMemoryAccessService } from '../interfaces/random-memory-access-service.interface';

@injectable()
export class MemoryStoreService {

    memory: GetMemory = {
        memoryUri: '',
        creator: {
            displayName: '',
            uniqueUserName: '',
            avatarUri: ''
        },
        memoryFriendlyName: ''
    };

    noMemoryForUser = false;
    possibleRecipient: UserProfile[] = [];

    @inject(AppContainerTypes.IRandomMemoryAccessService) private readonly memoryServiceService!: IRandomMemoryAccessService

    constructor() {
        makeObservable<MemoryStoreService>(this, {
            memory: observable,
            noMemoryForUser: observable,
            possibleRecipient: observable,
            hasValidMemorySource: computed,
            getRandomMemory: action
        });
    }

    get hasValidMemorySource(): boolean {
        return this.memory.memoryUri as unknown as boolean;
    }

    async getRandomMemory(): Promise<void> {
        const memory = await this.memoryServiceService.getRandomMemory();
        runInAction(() => {
            if (memory === null) {
                this.noMemoryForUser = true;
            } else {

                this.memory = memory;
            }
        });
    }
}