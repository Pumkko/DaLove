import { useInjection } from 'inversify-react';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { Text, Touchable, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AppContainerTypes } from '../../inversify/app-container-types';
import MainViewStyle from '../../MainView.style';
import { UserProfileCreationNavigationProp } from '../../navigation/navigation-types';
import { LoginStoreService } from '../../services/stores/login.store.service';

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
        <View>
            <Text>Unique username</Text>
            <TextInput
                onChangeText={setUniqueUserName}
                style={{ borderWidth: 1 }}
            ></TextInput>

            <Text>Display username</Text>
            <TextInput
                onChangeText={setDisplayName}
                style={{ borderWidth: 1 }}
            ></TextInput>

            <TouchableOpacity style={MainViewStyle.loveButton}>
                <Text
                    style={MainViewStyle.loveButtonText}
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
