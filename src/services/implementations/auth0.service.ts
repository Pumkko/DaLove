import { injectable } from 'inversify';
import Auth0 from 'react-native-auth0';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthConfiguration } from '../../configuration/auth-configuration.conf';
import { UserSession } from '../../data/user-session';
import { IAuthService } from '../interfaces/auth-service.interface';



@injectable()
export class Auth0Service implements IAuthService {

    private readonly auth0 = new Auth0(AuthConfiguration);


    login(): Promise<void> {
        return this.auth0.webAuth.authorize({
            audience: AuthConfiguration.audience,
            scope: 'openid profile offline_access email read:memories'
        }).then(credentials => {        
            const userSession: UserSession = {
                accesstoken : credentials.accessToken,
                refreshtoken: credentials.refreshToken,
                idtoken : credentials.idToken
            };
            
            return EncryptedStorage.setItem(
                'user_session',
                JSON.stringify(userSession)
            );
        });
    }

    logout(): Promise<void> {
        return this.auth0.webAuth.clearSession().then(() => {
            EncryptedStorage.removeItem('user_session');
        });
    }

}