import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    Text,
    ImageBackground,
    TouchableOpacity,
    View,
    Touchable,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import { AuthConfiguration } from './configuration/auth-configuration.conf';
import MainViewStyle from './MainView.style';
import { RootStackParamList } from './navigation/navigation-types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainView'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const auth0 = new Auth0(AuthConfiguration);

export const MainView: React.FC<Props> = ({ navigation }: Props) => {
    return (
        <ImageBackground
            source={require('./assets/images/Lake.jpg')}
            style={MainViewStyle.background}
        >
            <View style={MainViewStyle.container}>
                <TouchableOpacity style={MainViewStyle.loginButton}>
                    <Text style={MainViewStyle.loginButtonText}>Login</Text>
                </TouchableOpacity>

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
