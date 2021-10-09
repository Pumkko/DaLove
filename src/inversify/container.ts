import { Container, interfaces } from 'inversify';
import { IAuthService } from '../services/abstracts/auth-service.interface';
import { IRandomMemoryAccessService } from '../services/abstracts/random-memory-access-service.interface';
import { FakeAuthService } from '../services/implementations/mock/fake-auth.service';
import { FakeMemoryVideoService } from '../services/implementations/mock/fake-memory-video.service';
import { LoginStoreService } from '../services/stores/login.store.service';
import { MemoryStoreService } from '../services/stores/memory.store.service';
import { AppContainerTypes } from './app-container-types';


type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<IAuthService>(AppContainerTypes.IAuthService).to(FakeAuthService);
    container.bind<LoginStoreService>(AppContainerTypes.LoginStoreService).to(LoginStoreService).inSingletonScope();


    container.bind<IRandomMemoryAccessService>(AppContainerTypes.IRandomMemoryAccessService).to(FakeMemoryVideoService);
    container.bind<MemoryStoreService>(AppContainerTypes.MemoryStoreService).to(MemoryStoreService).inSingletonScope();
    return container;
};

export default AppContainer;