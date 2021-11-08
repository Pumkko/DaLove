import { injectable } from 'inversify';
import { IAuthService } from '../../interfaces/auth-service.interface';


@injectable()
export class FakeAuthService implements IAuthService {

    login(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                return resolve();
            }, 5000);
        });
    }
    logout(): Promise<void> {
        return Promise.resolve();
    }

}