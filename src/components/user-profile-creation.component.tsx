import React from 'react';
import { Text, Touchable, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MainViewStyle from '../MainView.style';
import { UserProfileCreationNavigationProp } from '../navigation/navigation-types';

type Props = {
    navigation: UserProfileCreationNavigationProp;
  };

export const UserProfileCreationComponent: React.FC<Props> = ({ navigation }: Props) => {
    

    return (
        <View>
            <Text>Unique username</Text>
            <TextInput style={{borderWidth: 1}} ></TextInput>

            <Text>Display username</Text>
            <TextInput style={{borderWidth: 1}}></TextInput>

            <TouchableOpacity style={MainViewStyle.loveButton}>
                <Text style={MainViewStyle.loveButtonText}
                    onPress={() => {
                        navigation.navigate('MainView');
                    }}                
                >Submit</Text>
            </TouchableOpacity>
        </View>
    );

};