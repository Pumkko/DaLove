import { StackNavigationProp } from '@react-navigation/stack';
import { MemoryVideoComponentParams } from './memory-video-component.params';

export type RootStackParamList = {
    MainView: undefined, // undefined because you aren't passing any params to the home screen
    MemoryVideo: MemoryVideoComponentParams,
    UserProfileCreation: undefined;
  };
  


export type MainViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainView'
>;

export type MemoryVideoViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MemoryVideo'
>;

export type UserProfileCreationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserProfileCreation'
>;