
import { useInjection } from 'inversify-react';
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AppContainerTypes } from '../inversify/app-container-types';
import MainViewStyle from '../MainView.style';
import { AuthService } from '../services/auth0.service';




export const LoginComponent: React.FC = () => {

    const [hasAccessToken, setHasAccessToken] = useState(false);

    const auth0 = useInjection<AuthService>(AppContainerTypes.AuthService);

    if(!hasAccessToken)
    {
        return (
            <TouchableOpacity style={MainViewStyle.loginButton} onPress={async () => {
                auth0.login();

                // hardcoded at the moment, we'll later use the state from mobx
                setHasAccessToken(true);
            }}>
                <Text style={MainViewStyle.loginButtonText}>Login</Text>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <TouchableOpacity style={MainViewStyle.loginButton} onPress={async () => {
                auth0.logout();

                // hardcoded at the moment, we'll later use the state from mobx
                setHasAccessToken(false);
            }}>
                <Text style={MainViewStyle.loginButtonText}>Log out</Text>
            </TouchableOpacity>
        );
    }

};