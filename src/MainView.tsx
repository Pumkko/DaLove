import { StackNavigationProp } from '@react-navigation/stack';
import { useInjection } from 'inversify-react';
import React from 'react';
import { Text, ImageBackground, TouchableOpacity, View } from 'react-native';
import { LoginComponent } from './components/login.component';
import { AppContainerTypes } from './inversify/app-container-types';
import MainViewStyle from './MainView.style';
import { MainViewNavigationProp } from './navigation/navigation-types';
import { LoginStoreService } from './services/stores/login.store.service';
import { MemoryStoreService } from './services/stores/memory.store.service';



type Props = {
  navigation: MainViewNavigationProp;
};

export const MainView: React.FC<Props> = ({ navigation }: Props) => {
    const loginStoreService = useInjection<LoginStoreService>(
        AppContainerTypes.LoginStoreService
    );

    const randomVideoService = useInjection<MemoryStoreService>(
        AppContainerTypes.MemoryStoreService
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
                        randomVideoService.getRandomMemory();
                        navigation.navigate('MemoryVideo', {
                            memoryStoreService: randomVideoService,
                        });
                    }}
                >
                    <Text style={MainViewStyle.loveButtonText}>I need some love</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default MainView;
