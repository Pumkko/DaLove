import { interfaces, Container } from 'inversify';
import { FakeAuthService } from '../services/implementations/mock/fake-auth.service';
import { FakeMemoryVideoService } from '../services/implementations/mock/fake-memory-video.service';
import { FakeUserProfileService } from '../services/implementations/mock/fake-user-profile.service';
import { IAuthService } from '../services/interfaces/auth-service.interface';
import { IRandomMemoryAccessService } from '../services/interfaces/random-memory-access-service.interface';
import { IUserProfileService } from '../services/interfaces/user-profile-service.interface';
import { LoginStoreService } from '../services/stores/login.store.service';
import { MemoryStoreService } from '../services/stores/memory.store.service';
import { AppContainerTypes } from './app-container-types';



type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<IAuthService>(AppContainerTypes.IAuthService).to(FakeAuthService);
    container.bind<IUserProfileService>(AppContainerTypes.IUserProfileService).to(FakeUserProfileService);
    container.bind<LoginStoreService>(AppContainerTypes.LoginStoreService).to(LoginStoreService).inSingletonScope();


    container.bind<IRandomMemoryAccessService>(AppContainerTypes.IRandomMemoryAccessService).to(FakeMemoryVideoService);
    container.bind<MemoryStoreService>(AppContainerTypes.MemoryStoreService).to(MemoryStoreService).inSingletonScope();
    return container;
};

export default AppContainer;