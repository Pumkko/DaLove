

import { Options } from 'react-native-auth0';
import Config from 'react-native-config';


export interface Auth0Options extends Options {
    audience: string
}


export const AuthConfiguration: Auth0Options = {
    clientId: Config.AUTH0_CLIENT_ID,
    domain: Config.AUTH0_DOMAIN,
    audience: Config.AUTH0_AUDIENCE
};
