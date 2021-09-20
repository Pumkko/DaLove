import { Container, interfaces } from 'inversify';
import { Auth0Service, IAuthService } from '../services/auth0.service';
import { FakeRandomVideoService, IRandomVideoService } from '../services/random-video.services';
import { AppContainerTypes } from './app-container-types';


type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<IAuthService>(AppContainerTypes.IAuthService).to(Auth0Service);
    container.bind<IRandomVideoService>(AppContainerTypes.IRandomVideoService).to(FakeRandomVideoService);
    return container;
};

export default AppContainer;