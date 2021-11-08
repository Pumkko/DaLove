import { injectable } from 'inversify';
import EncryptedStorage from 'react-native-encrypted-storage';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { BackendApi } from '../../configuration/backend-api.conf';
import { GetMemory } from '../../data/get-memory';
import { PostMemory } from '../../data/post-memory';
import { UserProfile } from '../../data/user-profile';
import { UserSession } from '../../data/user-session';
import { IRandomMemoryAccessService } from '../interfaces/random-memory-access-service.interface';
import { MemoryVideoUpload } from '../stores/upload-memory.store.service';



@injectable()
export class ApiMemoryService implements IRandomMemoryAccessService {
    async getRandomMemory(): Promise<GetMemory | null> {
        const endpoint = 'RandomMemories';

        const fullUrl = new URL(endpoint, BackendApi.rootUrl).href;


        const token = await this.getToken();
        const bearerToken = `Bearer ${token}`;

        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        });

        if(response.status === 204){
            return null;
        }        

        const jsonMemory = await response.json();
        return jsonMemory;
    }


    async getPossibleRecipientList(filter: string): Promise<UserProfile[]> {
        const endpoint = `UserProfile/filter/${filter}`;

        const fullUrl = new URL(endpoint, BackendApi.rootUrl).href;

        const token = await this.getToken();
        const bearerToken = `Bearer ${token}`;

        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken,
            }
        });

        const jsonResponse = await response.json();
        return jsonResponse;
    }


    async getToken(): Promise<string> {

        const item = await EncryptedStorage.getItem('user_session');
        if (item) {
            const session = JSON.parse(item) as UserSession;
            return session.accesstoken;
        }
        return '';
    }


    async pushNewMemory(memoryToSend: MemoryVideoUpload, recipientsUniqueUserName: string[], caption?: string): Promise<void> {
        const form = new FormData();

        form.append('memory', {
            uri: memoryToSend.path,
            type: memoryToSend.mimeType,
            name: 'uselessNameNotUsedByTheServer.mp4',
        });

        const dto: PostMemory = {
            memoryCaption: caption,
            recipients: recipientsUniqueUserName
        };

        const jsonContent = JSON.stringify(dto);

        form.append('jsonDto', jsonContent);

        const endpoint = 'RandomMemories';

        const fullUrl = new URL(endpoint, BackendApi.rootUrl);

        const token = await this.getToken();
        const bearerToken = `Bearer ${token}`;

        try {
            await fetch(fullUrl.href, {
                method: 'POST',
                headers: {
                    'Authorization': bearerToken,
                    'Content-Type': 'multipart/form-data'
                },
                body: form
            });

        } catch (err) {
            console.log(err);
            return;
        }
    }
}

