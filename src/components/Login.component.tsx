
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Auth0 from 'react-native-auth0';
import { AuthConfiguration } from '../configuration/auth-configuration.conf';
import MainViewStyle from '../MainView.style';

const auth0 = new Auth0(AuthConfiguration);

type Props = {
    hasAccessTokenCallback: (accessToken: string) => void;
};

export const LoginComponent: React.FC<Props> = (props) => {

    const [hasAccessToken, setHasAccessToken] = useState(false);

    if(!hasAccessToken)
    {
        return (
            <TouchableOpacity style={MainViewStyle.loginButton} onPress={() => {
                auth0.webAuth.authorize({
                    audience: AuthConfiguration.audience,
                    scope: 'openid profile email, read:memories'
                }).then((credentiels) => {
                    setHasAccessToken(true);
                    props.hasAccessTokenCallback(credentiels.accessToken);
                });
            }}>
                <Text style={MainViewStyle.loginButtonText}>Login</Text>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <TouchableOpacity style={MainViewStyle.loginButton} onPress={() => {
                auth0.webAuth.clearSession().then(() => {
                    setHasAccessToken(false);
                    props.hasAccessTokenCallback('');
                });
            }}>
                <Text style={MainViewStyle.loginButtonText}>Log out</Text>
            </TouchableOpacity>
        );
    }

};