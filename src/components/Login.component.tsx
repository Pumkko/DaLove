
import { useInjection } from 'inversify-react';
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AppContainerTypes } from '../inversify/app-container-types';
import MainViewStyle from '../MainView.style';
import { IAuthService } from '../services/auth0.service';

type Props = {
    hasAccessTokenCallback: (accessToken: string) => void;
};


export const LoginComponent: React.FC<Props> = (props) => {

    const [hasAccessToken, setHasAccessToken] = useState(false);

    const auth0 = useInjection<IAuthService>(AppContainerTypes.IAuthService);

    if(!hasAccessToken)
    {
        return (
            <TouchableOpacity style={MainViewStyle.loginButton} onPress={async () => {
                const token = await auth0.login();
                props.hasAccessTokenCallback(token);
                setHasAccessToken(true);
            }}>
                <Text style={MainViewStyle.loginButtonText}>Login</Text>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <TouchableOpacity style={MainViewStyle.loginButton} onPress={async () => {
                await auth0.logout();
                props.hasAccessTokenCallback('');
                setHasAccessToken(false);
            }}>
                <Text style={MainViewStyle.loginButtonText}>Log out</Text>
            </TouchableOpacity>
        );
    }

};