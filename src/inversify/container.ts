import { Container, interfaces } from 'inversify';
import { AuthStoreService, FakeAuthStoreService } from '../services/auth0.store.service';
import { RandomMemoryStoreService, MemoryStoreServiceFromHttpSource } from '../services/random-memory.store.service';

import { AppContainerTypes } from './app-container-types';


type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<AuthStoreService>(AppContainerTypes.AuthService).to(FakeAuthStoreService).inSingletonScope();
    container.bind<RandomMemoryStoreService>(AppContainerTypes.RandomMemoryService).to(MemoryStoreServiceFromHttpSource);
    return container;
};

export default AppContainer;