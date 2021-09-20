import { injectable } from 'inversify';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

export interface IRandomVideoService {
  getRandomVideo(): Promise<any>;
}

@injectable()
export class FakeRandomVideoServiceFromAssets implements IRandomVideoService {
  private readonly fake_Video = require('../assets/mock-video/SampleVideo_720x480_1mb.mp4');

  getRandomVideo(): Promise<any> {
      return Promise.resolve(this.fake_Video);
  }
}

@injectable()
export class RandomVideoService implements IRandomVideoService {
    getRandomVideo(): Promise<any> {

        const source =  {uri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4' };

        return Promise.resolve(source);
    }
}
