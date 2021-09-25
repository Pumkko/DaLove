import { inject, injectable } from 'inversify';
import { useInjection } from 'inversify-react';
import { autorun } from 'mobx';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { AppContainerTypes } from '../inversify/app-container-types';
import { AuthService, FakeAuthService } from './auth0.service';

export interface UriVideoSource {
    uri: string;
}

export type VideoSource = NodeRequire | UriVideoSource;

export interface IRandomVideoService {
    getRandomVideo(): Promise<VideoSource>;
}

@injectable()
export class RandomVideoServiceFromHttpSource implements IRandomVideoService {

    private accessToken = '';

    private authService: AuthService = useInjection(AppContainerTypes.AuthService);

    constructor(
       
    ) {
        autorun(() => {
            this.accessToken = this.authService.token;
        });
    }

    getRandomVideo(): Promise<VideoSource> {

        const t = this.authService.token;

        console.log(`call using token ${this.accessToken}`);


        const source = { uri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4' };

        return Promise.resolve(source);
    }
}
