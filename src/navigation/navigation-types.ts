import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  MainView: undefined, // undefined because you aren't passing any params to the home screen
  MemoryVideo: undefined,
  UserProfileCreation: undefined;
  UploadMemory: undefined;
  PickMemoryRecipient: undefined;
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

export type UploadMemoryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UploadMemory'
>

export type PickMemoryRecipientProp = StackNavigationProp<
  RootStackParamList,
  'PickMemoryRecipient'
>
