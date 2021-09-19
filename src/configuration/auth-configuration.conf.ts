

import { Options } from 'react-native-auth0';


export interface Auth0Options extends Options {
    audience: string
}

export const AuthConfiguration: Auth0Options = {
    clientId: '',
    domain: '',
    audience: ''
};
