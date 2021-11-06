import { observer } from 'mobx-react';
import React from 'react';
import { Image, ActivityIndicator, View, Text } from 'react-native';
import { LoginStoreService } from '../../services/stores/login.store.service';
import LoginComponentStyle from './login.component.style';

type Props = {
  loginStoreService: LoginStoreService;
};

export const LoginComponent: React.FC<Props> = observer(
    ({ loginStoreService }: Props) => {
        if (!loginStoreService.isLoginSuccessfull) {
            return <ActivityIndicator size="large" color="white"></ActivityIndicator>;
        } else {
            return (
                <View>
                    {loginStoreService.hasValidAvatar ? (
                        <Image
                            style={LoginComponentStyle.avatarStyle}
                            source={{ uri: loginStoreService.userProfile.avatarUri }}
                        ></Image>
                    ) : (
                        <Image
                            style={LoginComponentStyle.avatarStyle}
                            source={require('../../assets/images/blank_avatar.png')}
                        ></Image>
                    )}
                </View>
            );
        }
    }
);
