import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AppContainerTypes } from '../inversify/app-container-types';
import MainViewStyle from '../MainView.style';
import { AuthStoreService } from '../services/auth0.store.service';

type Props = {
  authStoreService: AuthStoreService;
};

export const LoginComponent: React.FC<Props> = observer(
    ({ authStoreService }: Props) => {
        if (!authStoreService.isLoginSuccessfull) {
            return (
                <TouchableOpacity
                    style={MainViewStyle.loginButton}
                    onPress={async () => {
                        authStoreService.login();
                    }}
                >
                    <Text style={MainViewStyle.loginButtonText}>Login</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={MainViewStyle.loginButton}
                    onPress={async () => {
                        authStoreService.logout();
                    }}
                >
                    <Text style={MainViewStyle.loginButtonText}>Log out</Text>
                </TouchableOpacity>
            );
        }
    }
);
