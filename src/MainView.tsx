import { StackNavigationProp } from '@react-navigation/stack';
import { useInjection } from 'inversify-react';
import React, { useState } from 'react';
import { Text, ImageBackground, TouchableOpacity, View } from 'react-native';
import { LoginComponent } from './components/Login.component';
import { AppContainerTypes } from './inversify/app-container-types';
import AppContainer from './inversify/container';
import MainViewStyle from './MainView.style';
import { RootStackParamList } from './navigation/navigation-types';
import { AuthStoreService } from './services/auth0.store.service';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainView'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const MainView: React.FC<Props> = ({ navigation }: Props) => {
    const authStoreService: AuthStoreService = useInjection(
        AppContainerTypes.AuthService
    );

    return (
        <ImageBackground
            source={require('./assets/images/Lake.jpg')}
            style={MainViewStyle.background}
        >
            <View style={MainViewStyle.container}>
                <LoginComponent authStoreService={authStoreService}></LoginComponent>

                <TouchableOpacity
                    style={MainViewStyle.loveButton}
                    onPress={() => {
                        navigation.navigate('Video');
                    }}
                >
                    <Text style={MainViewStyle.loveButtonText}>I need some love</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default MainView;
