import { useInjection } from 'inversify-react';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { Text, Image, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AppContainerTypes } from '../../inversify/app-container-types';
import MainViewStyle from '../../MainView.style';
import { UserProfileCreationNavigationProp } from '../../navigation/navigation-types';
import { LoginStoreService } from '../../services/stores/login.store.service';
import { UserProfileCreationStyle } from './user-profile-creation.screen.style';

type Props = {
  navigation: UserProfileCreationNavigationProp;
};

export const UserProfileCreationScreen: React.FC<Props> = ({
    navigation,
}: Props) => {
    const loginStoreService = useInjection<LoginStoreService>(
        AppContainerTypes.LoginStoreService
    );

    const [uniqueUserName, setUniqueUserName] = useState('');
    const [displayName, setDisplayName] = useState('');

    return (
        <View style={UserProfileCreationStyle.container}>


            <Image
                style={UserProfileCreationStyle.avatarStyle}
                source={require('../../assets/images/Lake.jpg')}
            ></Image>
                

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

            <TouchableOpacity style={[MainViewStyle.loveButton, UserProfileCreationStyle.submitButton]}>
                <Text
                    style={[MainViewStyle.loveButtonText, UserProfileCreationStyle.submitButtonText]}
                    onPress={async () => {
                        await loginStoreService.createUserProfile({
                            uniqueUserName,
                            displayName,
                        });
                        navigation.navigate('MainView');
                    }}
                >
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
};
