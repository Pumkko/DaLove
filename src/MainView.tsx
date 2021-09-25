import { StackNavigationProp } from '@react-navigation/stack';
import { useInjection } from 'inversify-react';
import React from 'react';
import { Text, ImageBackground, TouchableOpacity, View } from 'react-native';
import { LoginComponent } from './components/login.component';
import { AppContainerTypes } from './inversify/app-container-types';
import MainViewStyle from './MainView.style';
import { RootStackParamList } from './navigation/navigation-types';
import { AuthStoreService } from './services/abstracts/abstract-auth.store.service';
import { RandomMemoryStoreService } from './services/abstracts/abstract-random-memory.store.service';

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

    const randomVideoService: RandomMemoryStoreService = useInjection(
        AppContainerTypes.RandomMemoryService
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
                        randomVideoService.getRandomMemory();
                        navigation.navigate('MemoryVideo', {
                            randomVideoStoreService: randomVideoService,
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
