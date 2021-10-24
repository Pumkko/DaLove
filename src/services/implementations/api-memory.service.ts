import { injectable } from 'inversify';
import EncryptedStorage from 'react-native-encrypted-storage';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { BackendApi } from '../../configuration/backend-api.conf';
import { UserSession } from '../../data/user-session';
import { IRandomMemoryAccessService, UriVideoSource } from '../interfaces/random-memory-access-service.interface';



@injectable()
export class ApiMemoryService implements IRandomMemoryAccessService {


    async getRandomMemory(): Promise<UriVideoSource> {
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
        const textResponse = await response.text();
        const uriVideoSource: UriVideoSource = {
            uri: textResponse
        };
        return uriVideoSource;
    }

    async getToken(): Promise<string> {

        const item = await EncryptedStorage.getItem('user_session');
        if(item){
            const session = JSON.parse(item) as UserSession;
            return session.accesstoken;
        }
        return '';
    }

}

