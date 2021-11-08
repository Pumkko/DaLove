import { UploadMemoryStoreService } from '../services/stores/upload-memory.store.service';

export type RootStackParamList = {
  MainView: undefined, // undefined because you aren't passing any params to the home screen
  MemoryVideo: undefined,
  UserProfileCreation: undefined;
  UploadMemory: undefined;
  PickMemoryRecipient: {
    uploadMemoryStoreService: UploadMemoryStoreService
  };
  LoadingScreen: undefined;
};
