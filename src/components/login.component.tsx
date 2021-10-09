import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import MainViewStyle from '../MainView.style';
import { LoginStoreService } from '../services/stores/login.store.service';

type Props = {
  loginStoreService: LoginStoreService;
};

export const LoginComponent: React.FC<Props> = observer(
    ({ loginStoreService }: Props) => {
        if (!loginStoreService.isLoginSuccessfull) {
            return (
                <TouchableOpacity
                    style={MainViewStyle.loginButton}
                    onPress={async () => {
                        await loginStoreService.login();
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
                        await loginStoreService.logout();
                    }}
                >
                    <Text style={MainViewStyle.loginButtonText}>Log out</Text>
                </TouchableOpacity>
            );
        }
    }
);
