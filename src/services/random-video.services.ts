import { injectable } from "inversify";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

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
  constructor() {}

  getRandomVideo(): Promise<any> {

    const source =  {uri: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4' }

    return Promise.resolve(source);
  }
}
