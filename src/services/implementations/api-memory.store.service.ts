import { inject, injectable } from 'inversify';
import { autorun } from 'mobx';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { BackendApi } from '../../configuration/backend-api.conf';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { AuthStoreService } from '../abstracts/abstract-auth.store.service';
import { RandomMemoryStoreService } from '../abstracts/abstract-random-memory.store.service';



@injectable()
export class ApiMemoryStoreService extends RandomMemoryStoreService {

    private token = '';

    constructor(@inject(AppContainerTypes.AuthService) authStoreService: AuthStoreService) {
        super();

        autorun(() => {
            this.token = authStoreService.token;
        });
    }

    getRandomMemory(): void {
        const endpoint = 'RandomMemories';

        const fullUrl = new URL(endpoint, BackendApi.rootUrl).href;

        const bearerToken = `Bearer ${this.token}`;

        fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        }).then(response => response.text()
            .then(textResponse => {
                this.setRandomMemorySource(textResponse);
            })
            .catch(error => {
                console.log(error);
            })
        );
    }

}

