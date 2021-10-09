import { inject, injectable } from 'inversify';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { BackendApi } from '../../configuration/backend-api.conf';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { IRandomMemoryAccessService, UriVideoSource } from '../abstracts/random-memory-access-service.interface';
import { LoginStoreService } from '../stores/login.store.service';



@injectable()
export class ApiMemoryService implements IRandomMemoryAccessService {

    @inject(AppContainerTypes.LoginStoreService) private readonly authService!: LoginStoreService



    getRandomMemory(): Promise<UriVideoSource> {
        const endpoint = 'RandomMemories';

        const fullUrl = new URL(endpoint, BackendApi.rootUrl).href;

        const bearerToken = `Bearer ${this.authService.token}`;

        return fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        }).then(response => response.text()
            .then(textResponse => {
                const uriVideoSource: UriVideoSource = {
                    uri: textResponse
                };
                return uriVideoSource;
            })
        );
    }
}

