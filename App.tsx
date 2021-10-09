import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MemoryVideoComponent from './src/components/memory-video.component';
import { MainView } from './src/MainView';


import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation/navigation-types';
import { Provider } from 'inversify-react';
import AppContainer from './src/inversify/container';

import 'reflect-metadata';
import { UserProfileCreationComponent } from './src/components/user-profile-creation.component';

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
                        name='MemoryVideo'
                        component={MemoryVideoComponent}/>

                    <Stack.Screen
                        name='UserProfileCreation'
                        component={UserProfileCreationComponent}
                        options={{
                            headerShown: true,
                            title: 'user profile creation'
                        }}/>

                </Stack.Navigator>

            </NavigationContainer>
        </Provider>
    );
};

export default App;
