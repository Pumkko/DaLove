import { useInjection } from 'inversify-react';
import ImagePicker from 'react-native-image-crop-picker';
import React, { useState } from 'react';
import { Text, Image, View } from 'react-native';
import {
    TextInput,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import { AppContainerTypes } from '../../inversify/app-container-types';
import MainViewStyle from '../../MainView.style';
import { UserProfileCreationNavigationProp } from '../../navigation/navigation-types';
import { LoginStoreService } from '../../services/stores/login.store.service';
import { UserProfileCreationStyle } from './user-profile-creation.screen.style';


type Props = {
    navigation: UserProfileCreationNavigationProp;
};


class AvatarRequire {
    static path = require('../../assets/images/blank_avatar.png');
}

export interface AvatarSource {
    uri: string;
    mimeType: string;
}

export const UserProfileCreationScreen: React.FC<Props> = ({
    navigation,
}: Props) => {

    const loginStoreService = useInjection<LoginStoreService>(
        AppContainerTypes.LoginStoreService
    );

    const [uniqueUserName, setUniqueUserName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [imagePath, setImagePath] = useState<AvatarSource>(AvatarRequire.path);

    return (
        <View style={UserProfileCreationStyle.container}>
            <TouchableOpacity
                onPress={() => {
                    ImagePicker.openPicker({
                        width: 140,
                        height: 140,
                        cropping: true,
                        mediaType: 'photo',
                        cropperCircleOverlay: true,
                        includeBase64: true
                    }).then((selectedImage) => {
                        const newSource: AvatarSource = {
                            uri: selectedImage.path,
                            mimeType: selectedImage.mime
                        };
                        setImagePath(newSource);
                    });
                }}
            >
                <Image style={UserProfileCreationStyle.avatarStyle} source={imagePath}></Image>
            </TouchableOpacity>

            <View style={UserProfileCreationStyle.textBlock}>
                <Text>Unique username</Text>
                <TextInput
                    onChangeText={setUniqueUserName}
                    style={UserProfileCreationStyle.textInputStyle}
                ></TextInput>
            </View>
            <View style={UserProfileCreationStyle.textBlock}>
                <Text>Display username</Text>
                <TextInput
                    onChangeText={setDisplayName}
                    style={UserProfileCreationStyle.textInputStyle}
                ></TextInput>
            </View>

            <TouchableOpacity
                style={[
                    MainViewStyle.loveButton,
                    UserProfileCreationStyle.submitButton,
                ]}
            >
                <Text
                    style={[
                        MainViewStyle.loveButtonText,
                        UserProfileCreationStyle.submitButtonText,
                    ]}
                    onPress={async () => {
                        await loginStoreService.createUserProfile({
                            uniqueUserName,
                            displayName,
                        });
                        await loginStoreService.storeAvatar(imagePath);
                        navigation.navigate('MainView');
                    }}
                >
          Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
};
