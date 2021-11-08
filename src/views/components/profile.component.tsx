import { observer } from 'mobx-react';
import React from 'react';
import { Image, View } from 'react-native';
import { LoginStoreService } from '../../services/stores/login.store.service';
import ProfileComponentStyle from './profile.component.style';

type Props = {
  loginStoreService: LoginStoreService;
};

export const ProfileComponent: React.FC<Props> = observer(
    ({ loginStoreService }: Props) => {
        return (
            <View>
                {loginStoreService.hasValidAvatar ? (
                    <Image
                        style={ProfileComponentStyle.avatarStyle}
                        source={{ uri: loginStoreService.userProfile.avatarUri }}
                    ></Image>
                ) : (
                    <Image
                        style={ProfileComponentStyle.avatarStyle}
                        source={require('../../assets/images/blank_avatar.png')}
                    ></Image>
                )}
            </View>
        );
    }
);
