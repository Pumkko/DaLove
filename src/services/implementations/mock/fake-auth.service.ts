import { injectable } from 'inversify';
import { IAuthService } from '../../interfaces/auth-service.interface';


@injectable()
export class FakeAuthService implements IAuthService {

    login(): Promise<string> {
        return Promise.resolve('fake token');
    }
    logout(): Promise<void> {
        return Promise.resolve();
    }

}