import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainView } from './src/MainView';

import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation/navigation-types';
import { Provider } from 'inversify-react';
import AppContainer from './src/inversify/container';

import 'reflect-metadata';
import { UserProfileCreationScreen } from './src/views/screens/user-profile-creation.screen';
import MemoryVideoScreen from './src/views/screens/memory-video.screen';
import { UploadMemoryScreen } from './src/views/screens/upload-memory.screen';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <Provider container={AppContainer}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="MainView" component={MainView} />

                    <Stack.Screen name="MemoryVideo" component={MemoryVideoScreen} />

                    <Stack.Screen
                        name="UserProfileCreation"
                        component={UserProfileCreationScreen}
                        options={{
                            headerShown: true,
                            title: 'user profile creation',
                        }}
                    />

                    <Stack.Screen
                        name="UploadMemory"
                        component={UploadMemoryScreen}
                        options={{
                            headerShown: true,
                            title: 'Upload memory',
                        }}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
