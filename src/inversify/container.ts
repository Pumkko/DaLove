import { Container, interfaces } from 'inversify';
import { AuthStoreService, FakeAuthStoreService } from '../services/auth0.store.service';
import { IRandomVideoService, RandomVideoServiceFromHttpSource } from '../services/random-video.services';
import { AppContainerTypes } from './app-container-types';


type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<AuthStoreService>(AppContainerTypes.AuthService).to(FakeAuthStoreService).inSingletonScope();
    container.bind<IRandomVideoService>(AppContainerTypes.IRandomVideoService).to(RandomVideoServiceFromHttpSource);
    return container;
};

export default AppContainer;