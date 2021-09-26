import { Container, interfaces } from 'inversify';
import { AuthStoreService } from '../services/abstracts/abstract-auth.store.service';
import { RandomMemoryStoreService } from '../services/abstracts/abstract-random-memory.store.service';
import { ApiMemoryStoreService } from '../services/implementations/api-memory.store.service';
import { FakeAuthStoreService } from '../services/implementations/mock/auth.store.service.mock';
import { AppContainerTypes } from './app-container-types';


type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<AuthStoreService>(AppContainerTypes.AuthService).to(FakeAuthStoreService).inSingletonScope();
    container.bind<RandomMemoryStoreService>(AppContainerTypes.RandomMemoryService).to(ApiMemoryStoreService);
    return container;
};

export default AppContainer;