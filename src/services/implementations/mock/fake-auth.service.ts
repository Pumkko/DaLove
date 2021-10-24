import { injectable } from 'inversify';
import { IAuthService } from '../../interfaces/auth-service.interface';


@injectable()
export class FakeAuthService implements IAuthService {

    login(): Promise<void> {
        return Promise.resolve();
    }
    logout(): Promise<void> {
        return Promise.resolve();
    }

}