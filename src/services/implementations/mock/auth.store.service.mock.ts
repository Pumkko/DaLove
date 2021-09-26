import { injectable } from 'inversify';
import { AuthStoreService } from '../../abstracts/abstract-auth.store.service';

@injectable()
export class FakeAuthStoreService extends AuthStoreService {
    login(): void {
        this.setToken('fake token');
    }
    logout(): void {
        this.setToken('');
    }

}