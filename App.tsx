import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Lovideo from './src/components/Lovideo.component';
import { MainView } from './src/MainView';


import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation/navigation-types';
import { Provider } from 'inversify-react';
import AppContainer from './src/inversify/container';

import 'reflect-metadata';

const Stack = createStackNavigator<RootStackParamList>();


const App: React.FC = () => {
    return (
        <Provider container={AppContainer}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>

                    <Stack.Screen
                        name='MainView'
                        component={MainView} />

                    <Stack.Screen
                        name='Video'
                        component={Lovideo} />

                </Stack.Navigator>

            </NavigationContainer>
        </Provider>
    );
};

export default App;
