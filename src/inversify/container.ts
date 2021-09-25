import { Container, interfaces } from 'inversify';
import { AuthService, FakeAuthService } from '../services/auth0.service';
import { IRandomVideoService, RandomVideoServiceFromHttpSource } from '../services/random-video.services';
import { AppContainerTypes } from './app-container-types';


type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<AuthService>(AppContainerTypes.AuthService).to(FakeAuthService).inSingletonScope();
    container.bind<IRandomVideoService>(AppContainerTypes.IRandomVideoService).to(RandomVideoServiceFromHttpSource);
    return container;
};

export default AppContainer;