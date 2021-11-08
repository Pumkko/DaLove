import { useInjection } from 'inversify-react';
import React, { useEffect, useState } from 'react';
import {
    Text,
    ImageBackground,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { ProfileComponent } from './views/components/profile.component';
import { AppContainerTypes } from './inversify/app-container-types';
import MainViewStyle from './MainView.style';
import { RootStackParamList } from './navigation/navigation-types';
import { LoginStoreService } from './services/stores/login.store.service';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { LoadingComponent } from './views/components/loading.component';

export type MainViewNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MainView'
>;

export const MainView: React.FC<MainViewNavigationProp> = observer(
    ({ navigation }: MainViewNavigationProp) => {
        const loginStoreService = useInjection<LoginStoreService>(
            AppContainerTypes.LoginStoreService
        );

        useEffect(() => {
            console.log('in main view effect');
            if (!loginStoreService.alreadyLogin) {

                console.log('try to login');
                loginStoreService.login().then(() => {
                    if (
                        !loginStoreService.errorDuringLogin &&
                        !loginStoreService.alreadyLogin
                    ) {
                        // The user does not have a profile
                        navigation.navigate('UserProfileCreation');
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }, []);

        if (!loginStoreService.alreadyLogin) {
            return (
                <LoadingComponent
                    loginStoreService={loginStoreService}
                ></LoadingComponent>
            );
        } else {
            return (
                <ImageBackground
                    source={require('./assets/images/Lake.jpg')}
                    style={MainViewStyle.background}
                >
                    <View style={MainViewStyle.container}>
                        <View style={MainViewStyle.loginComponent}>
                            <ProfileComponent
                                loginStoreService={loginStoreService}
                            ></ProfileComponent>
                        </View>

                        <View style={MainViewStyle.bottomContainer}>
                            <TouchableOpacity
                                style={MainViewStyle.loveButton}
                                onPress={() => {
                                    navigation.navigate('MemoryVideo');
                                }}
                            >
                                <Text style={MainViewStyle.loveButtonText}>
                  I need some love
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={MainViewStyle.uploadMemoryButton}
                                onPress={() => {
                                    navigation.navigate('UploadMemory');
                                }}
                            >
                                <Image
                                    style={MainViewStyle.uploadMemoryImage}
                                    source={require('./assets/images/upload.png')}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            );
        }
    }
);

export default MainView;
