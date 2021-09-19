import { Container, interfaces } from 'inversify';
import { FakeAuthService, IAuthService } from '../services/auth0.service';
import { AppContainerTypes } from './app-container-types';



type interfaceContainerMethod = () => interfaces.Container;

const AppContainer: interfaceContainerMethod = () => {
    const container = new Container();
    container.bind<IAuthService>(AppContainerTypes.IAuthService).to(FakeAuthService);
    return container;
};

export default AppContainer;