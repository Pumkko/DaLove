import { injectable } from 'inversify';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

export interface UriVideoSource {
    uri: string;
}

export type VideoSource = NodeRequire | UriVideoSource;

export interface IRandomVideoService {
    getRandomVideo(): Promise<VideoSource>;
}

@injectable()
export class RandomVideoService implements IRandomVideoService {
    getRandomVideo(): Promise<VideoSource> {
        const source = { uri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4' };

        return Promise.resolve(source);
    }
}
