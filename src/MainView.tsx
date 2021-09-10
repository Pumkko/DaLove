import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    Text,
    ImageBackground,
    TouchableOpacity,
    View,
} from 'react-native';
import MainViewStyle from './MainView.style';
import { RootStackParamList } from './navigation/navigation-types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainView'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const MainView: React.FC<Props> = ({navigation}: Props) => {
    return (
        <ImageBackground
            source={require('./assets/images/Lake.jpg')}
            style={MainViewStyle.background}
        >
            <View style={MainViewStyle.container}>
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
