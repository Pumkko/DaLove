import { injectable, inject } from 'inversify';
import { action, comparer, computed, makeObservable, observable, runInAction } from 'mobx';
import ImageCropPicker from 'react-native-image-crop-picker';
import { UserProfile } from '../../data/user-profile';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { IRandomMemoryAccessService } from '../interfaces/random-memory-access-service.interface';


export interface MemoryVideoUpload {
    width: number;
    height: number;
    path: string;
    mimeType: string;
}

@injectable()
export class UploadMemoryStoreService {
    possibleRecipients: UserProfile[] = [];
    selectedRecipients: UserProfile[] = [];

    memoryToSend: MemoryVideoUpload = {
        height: 0,
        width: 0,
        path: '',
        mimeType: ''
    };

    memoryCaption?: string;

    get hasPickedAMemory(): boolean {
        return this.memoryToSend.path as unknown as boolean;
    }

    @inject(AppContainerTypes.IRandomMemoryAccessService) private readonly memoryService!: IRandomMemoryAccessService

    constructor() {
        makeObservable(this, {
            possibleRecipients: observable,
            selectedRecipients: observable,
            memoryToSend: observable,
            hasPickedAMemory: computed,
            addOrRemoveSelectedRecipient: action
        });
    }

    async pickVideoToUplaod(): Promise<boolean> {

        try {
            const video = await ImageCropPicker.openPicker({
                mediaType: 'video',
            });

        
            runInAction(() => {
                this.memoryToSend = {
                    height: video.height,
                    width: video.width,
                    path: video.path,
                    mimeType: video.mime
                };
            });

            return true;
        }
        catch(err){
            return false;
        }
    }

    async getPossibleRecipientList(filter: string): Promise<void> {
        const recipients = await this.memoryService.getPossibleRecipientList(filter);
        runInAction(() => {
            this.possibleRecipients = recipients;
        });
    }

    addOrRemoveSelectedRecipient(recipient: UserProfile): void {
        const indexOf = this.selectedRecipients.indexOf(recipient);
        if (indexOf > -1) {
            this.selectedRecipients.splice(indexOf, 1);
        } else {
            this.selectedRecipients.push(recipient);
        }

    }

    async uploadMemory(): Promise<void> {
        if(!this.hasPickedAMemory || this.selectedRecipients.length === 0){
            return Promise.resolve();
        }

        try {
            await this.memoryService.pushNewMemory(this.memoryToSend, this.selectedRecipients.map(r => r.uniqueUserName), this.memoryCaption);
        }catch(err){
            console.log(err);
        }
    }
}