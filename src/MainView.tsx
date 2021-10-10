import { useInjection } from 'inversify-react';
import React from 'react';
import { Text, ImageBackground, TouchableOpacity, View } from 'react-native';
import { LoginComponent } from './views/components/login.component';
import { AppContainerTypes } from './inversify/app-container-types';
import MainViewStyle from './MainView.style';
import { MainViewNavigationProp } from './navigation/navigation-types';
import { LoginStoreService } from './services/stores/login.store.service';



type Props = {
  navigation: MainViewNavigationProp;
};

export const MainView: React.FC<Props> = ({ navigation }: Props) => {
    const loginStoreService = useInjection<LoginStoreService>(
        AppContainerTypes.LoginStoreService
    );

    return (
        <ImageBackground
            source={require('./assets/images/Lake.jpg')}
            style={MainViewStyle.background}
        >
            <View style={MainViewStyle.container}>
                <LoginComponent
                    navigation={navigation}
                    loginStoreService={loginStoreService}
                ></LoginComponent>

                <TouchableOpacity
                    style={MainViewStyle.loveButton}
                    onPress={() => {
                        navigation.navigate('MemoryVideo');
                    }}
                >
                    <Text style={MainViewStyle.loveButtonText}>I need some love</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default MainView;
