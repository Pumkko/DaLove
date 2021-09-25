import { injectable } from 'inversify';
import { useInjection } from 'inversify-react';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { AppContainerTypes } from '../inversify/app-container-types';
import { AuthStoreService } from './auth0.store.service';

export interface UriVideoSource {
    uri: string;
}

export type VideoSource = NodeRequire | UriVideoSource;

export interface IRandomVideoService {
    getRandomVideo(): Promise<VideoSource>;
}

@injectable()
export class RandomVideoServiceFromHttpSource implements IRandomVideoService {

    private authService: AuthStoreService = useInjection(AppContainerTypes.AuthService);

    getRandomVideo(): Promise<VideoSource> {
        console.log(`call using token ${this.authService.token}`);
        const source = { uri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4' };

        return Promise.resolve(source);
    }
}
