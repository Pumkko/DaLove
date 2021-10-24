import { injectable } from 'inversify';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BackendApi } from '../../configuration/backend-api.conf';
import { UserProfile } from '../../data/user-profile';
import { UserSession } from '../../data/user-session';
import { IUserProfileService } from '../interfaces/user-profile-service.interface';

@injectable()
export class UserProfileService implements IUserProfileService {

    async createUserProfile(newUserProfile: UserProfile): Promise<UserProfile> {
        const endpoint = 'UserProfile';

        const fullUrl = new URL(endpoint, BackendApi.rootUrl).href;

        const token = await this.getToken();
        const bearerToken = `Bearer ${token}`;

        console.log(fullUrl);
        const jsonBody = JSON.stringify(newUserProfile);
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': bearerToken,
                'Content-Type': 'application/json'
            },
            body: jsonBody
        });
       
        const jsonResponse = await response.json();
        return jsonResponse;
    }


    async getConnectedUserProfile(): Promise<UserProfile | null> {
        const endpoint = 'UserProfile';

        const fullUrl = new URL(endpoint, BackendApi.rootUrl);

        const token = await this.getToken();
        const bearerToken = `Bearer ${token}`;

        const response = await fetch(fullUrl.href, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        });

        if (response.status !== 200) {
            return null;
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    }

    async getToken(): Promise<string> {

        const item = await EncryptedStorage.getItem('user_session');
        if (item) {
            const session = JSON.parse(item) as UserSession;
            return session.accesstoken;
        }
        return '';
    }

}