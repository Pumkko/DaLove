import { observer } from 'mobx-react';
import React from 'react';
import { TouchableOpacity, Text, ToastAndroid } from 'react-native';
import MainViewStyle from '../../MainView.style';
import { MainViewNavigationProp } from '../../navigation/navigation-types';
import { LoginStoreService } from '../../services/stores/login.store.service';


type Props = {
    navigation: MainViewNavigationProp;  
    loginStoreService: LoginStoreService;
};

export const LoginComponent: React.FC<Props> = observer(
    ({ navigation, loginStoreService }: Props) => {

        if (!loginStoreService.isLoginSuccessfull) {
            return (
                <TouchableOpacity
                    style={MainViewStyle.loginButton}
                    onPress={async () => {
                        try {
                            const userProfile = await loginStoreService.login();
                            if(userProfile.uniqueUserName === '') {
                                navigation.navigate('UserProfileCreation');
                            }

                        } catch {
                            // TODO:  Will rework later for a more crossplatform solutin
                            ToastAndroid.show('Failed to login', ToastAndroid.LONG);
                        }
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
