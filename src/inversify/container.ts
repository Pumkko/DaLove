import { Container, interfaces } from 'inversify';
import { FakeAuthService, IAuthService } from '../services/auth0.service';
import { FakeRandomVideoServiceFromAssets, IRandomVideoService } from '../services/random-video.services';
import { AppContainerTypes } from './app-container-types';


type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<IAuthService>(AppContainerTypes.IAuthService).to(FakeAuthService);
    container.bind<IRandomVideoService>(AppContainerTypes.IRandomVideoService).to(FakeRandomVideoServiceFromAssets);
    return container;
};

export default AppContainer;